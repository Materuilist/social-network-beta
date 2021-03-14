const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const { env } = require("process");

const getConfig = require("./utils/getConfig");

const adminRouter = require("./routes/admin.route");
const authRouter = require("./routes/auth.route");
const friendsRouter = require("./routes/friends.route");
const userInfoRouter = require("./routes/user-info.route");
const dictionariesRouter = require("./routes/dictionaries.route");
const likeRouter = require("./routes/like.route");
const chatRouter = require("./routes/chat.route");
const { User } = require("./models/user.model");
const TokenProcessor = require("./services/tokenProcessor");
const { Chat } = require("./models/chat.model");
const { Message } = require("./models/message.model");

const app = express();
const server = http.createServer(app);
const dbConnectionString = getConfig().database;

app.use("/", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

app.use(
    express.static("src/static/"),
    express.static(path.join(__dirname, "../dist"))
);
app.use("/", bodyParser.json({ limit: "5mb" }));

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/userinfo", userInfoRouter);
app.use("/api/dictionaries", dictionariesRouter);
app.use("/api/like", likeRouter);
app.use("/api/chats", chatRouter);

app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.use("/", (error, req, res, next) => {
    if (error) {
        console.log(error);
        return res.status(error.status).json({ message: error.message });
    }
});

mongoose.connect(dbConnectionString, async (err) => {
    if (err) {
        console.log(err);
        return;
    }

    const wss = new WebSocket.Server({ server });

    wss.on("connection", (websocket) => {
        websocket.on("close", () => {
            if (!websocket.user) return;

            User.findByIdAndUpdate(websocket.user._id, { isOnline: false });
            wss.clients.forEach((client) =>
                client.send(
                    JSON.stringify({
                        event: "toggle-status",
                        payload: {
                            userId: websocket.user?._id,
                            isOnline: false,
                        },
                    })
                )
            );
        });
        websocket.on("message", async (message) => {
            const { event, payload, token } = JSON.parse(message);

            if (!token) {
                return websocket.close(4001, "Пользователь не найден");
            }

            const { login } = await TokenProcessor.decodeToken(token);
            if (!login) {
                return websocket.close(4001, "Действие токена истекло");
            }

            switch (event) {
                case "enter": {
                    const user = await User.findOne({ login });
                    if (!user) {
                        return websocket.close(4001, "Пользователь не найден");
                    }
                    user.isOnline = true;
                    user.save();
                    websocket.user = user;
                    wss.clients.forEach(
                        (client) =>
                            client.user?._id !== websocket.user._id &&
                            client.send(
                                JSON.stringify({
                                    event: "toggle-status",
                                    payload: {
                                        userId: websocket.user?._id,
                                        isOnline: true,
                                    },
                                })
                            )
                    );
                    return websocket.send(JSON.stringify({ event: "enter" }));
                }
                case "dialogue-message": {
                    const {
                        receiverId,
                        text,
                        timestamp = new Date(),
                    } = payload;

                    if (!receiverId || !text) {
                        return;
                    }

                    const { user: sender } = websocket;

                    let chat = await Chat.findOne({
                        $and: [
                            { "members._id": receiverId },
                            { "members._id": sender._id },
                        ],
                    });

                    if (!chat) {
                        chat = await Chat.create({
                            members: [
                                {
                                    _id: receiverId,
                                    needsNotification: true,
                                },
                                {
                                    _id: sender._id,
                                    needsNotification: true,
                                },
                            ],
                            messages: [],
                        });
                        await User.findById(receiverId).then((receiver) => {
                            sender.chats.push(chat._id);
                            receiver.chats.push(chat._id);
                            return Promise.all([
                                receiver.save(),
                                sender.save(),
                            ]);
                        });
                    }

                    const message = await Message.create({
                        sender: sender._id,
                        content: text,
                        timestamp,
                    });

                    chat.messages.unshift(message._id);
                    await chat.save();

                    websocket.send(
                        JSON.stringify({
                            event: "message delivered",
                            payload: { chat, message },
                        })
                    );

                    wss.clients.forEach(async (client) => {
                        if (client.user?.id === receiverId) {
                            client.send(
                                JSON.stringify({
                                    event: "incoming message",
                                    payload: {
                                        chat,
                                        message,
                                        senderDetails: {
                                            id: sender._id,
                                            avatar: sender.avatar,
                                            login: sender.login,
                                        },
                                    },
                                })
                            );
                        }
                    });
                    return;
                }
            }
        });
    });

    server.listen(env.PORT || 8000, () => {
        console.log("server started successfully!");
    });
});
