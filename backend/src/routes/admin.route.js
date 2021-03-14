const fs = require("fs");
const fsPromises = fs.promises;

const express = require("express");
const Encrypter = require("../services/encrypter");

const { User } = require("../models/user.model");
const { City } = require("../models/city.model");
const { Interest } = require("../models/interest.model");
const { Status } = require("../models/status.model");
const { Chat } = require("../models/chat.model");
const { Message } = require("../models/message.model");

const router = express.Router();

const getUsers = async (n = 30) => {
    const dummies = [];
    let iter = 1;
    while (iter <= n - 4) {
        dummies.push({
            login: `man${iter}`,
            password: await Encrypter.hash(`man${iter}`),
            isOnline: false,
        });
        iter++;
    }

    return [
        {
            login: "materuilist",
            password: await Encrypter.hash("borow123"),
            isOnline: false,
        },
        {
            login: "borow",
            password: await Encrypter.hash("borow"),
            isOnline: false,
        },
        {
            login: "lynx",
            password: await Encrypter.hash("lynx"),
            isOnline: false,
        },
        {
            login: "kapo",
            password: await Encrypter.hash("kapo"),
            isOnline: false,
        },
        ...dummies,
    ];
};

router.get("/initialize", async (req, res, next) => {
    const [, , , , , , cities] = await Promise.all([
        User.deleteMany({}),
        City.deleteMany({}),
        Interest.deleteMany({}),
        Status.deleteMany({}),
        Chat.deleteMany({}),
        Message.deleteMany({}),
        fsPromises
            .readFile(__dirname + "/../static/cities.json", "utf-8")
            .then((data) => JSON.parse(data)),
    ]);

    await Promise.all([
        City.create(cities),
        Interest.create(
            {
                naming: "Плавание",
            },
            {
                naming: "Программирование",
            },
            {
                naming: "Футбол",
            },
            {
                naming: "Баскетбол",
            },
            {
                naming: "Шахматы",
            }
        ),
        Status.create(
            {
                name: "Важный",
                imageName: "important.svg",
            },
            {
                name: "Соучащийся",
                imageName: "classmate.svg",
            },
            {
                name: "Коллега",
                imageName: "colleague.svg",
            },
            {
                name: "Родственник",
                imageName: "relative.svg",
            }
        ),
        getUsers().then((users) => User.create(users)),
    ]);

    res.status(201).json({ message: "Initialized successfully" });
});

module.exports = router;
