const express = require("express");
const Encrypter = require("../services/encrypter");

const { User } = require("../models/user");

const router = express.Router();

router.get("/initialize", async (req, res, next) => {
    await User.deleteMany({});

    await User.create({
        login: "Admin",
        password: await Encrypter.hash("admin123"),
    });

    await User.create({
        login: "materuilist",
        password: await Encrypter.hash("borow123"),
    });

    res.status(201).json({ message: "Initialized successfully" });
});

module.exports = router;
