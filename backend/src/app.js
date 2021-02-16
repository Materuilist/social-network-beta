const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const getConfig = require("./utils/getConfig");

const adminRouter = require("./routes/admin.route");
const authRouter = require("./routes/auth.route");
const friendsRouter = require("./routes/friends.route");
const userInfoRouter = require("./routes/user-info.route");
const dictionariesRouter = require("./routes/dictionaries.route");
const likeRouter = require("./routes/like.route");

const app = express();
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

    app.listen(8000, () => {
        console.log("server started successfully!");
    });
});
