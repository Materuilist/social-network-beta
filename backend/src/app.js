const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const getConfig = require("./utils/getConfig");

const adminRouter = require("./routes/admin.route");
const authRouter = require("./routes/auth.route");
const friendsRouter = require("./routes/friends.route");
const userInfoRouter = require("./routes/user-info.route");
const dictionariesRouter = require("./routes/dictionaries.route");
const likeRouter = require("./routes/like.route");
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

app.use(express.static("src/static/"));
app.use("/", bodyParser.json({ limit: "5mb" }));

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/friends", friendsRouter);
app.use("/userinfo", userInfoRouter);
app.use("/dictionaries", dictionariesRouter);
app.use("/like", likeRouter);

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
                    websocket.user = user;
                    return websocket.send(JSON.stringify({ event: "enter" }));
                }
                case "chat-message": {
                    const {
                        receiverId,
                        text,
                        timestamp = new Date(),
                        chatId,
                    } = payload;

                    if (!receiverId || !text) {
                        return;
                    }

                    wss.clients.forEach(async (client) => {
                        if (client.user?.id === receiverId) {
                            const { user: receiver } = client;
                            const { user: sender } = websocket;
                            let chat;

                            if (chatId) {
                                chat = await Chat.findById(chatId);
                            }
                            if (!chat) {
                                chat = await Chat.create({
                                    members: [
                                        {
                                            user: receiverId,
                                            needsNotification: true,
                                        },
                                        {
                                            user: sender._id,
                                            needsNotification: true,
                                        },
                                    ],
                                    messages: [],
                                });
                            }

                            const message = await Message.create({
                                sender: sender._id,
                                content: text,
                                timestamp,
                            });

                            chat.messages.push(message._id);
                            await chat.save();

                            return client.send(
                                JSON.stringify({
                                    event: "incoming message",
                                    payload: { chat, message },
                                })
                            );
                        }
                    });
                    return;
                }
            }
        });
    });

    server.listen(8000, () => {
        console.log("server started successfully!");
    });
});
