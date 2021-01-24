const fs = require("fs");

const express = require("express");
const Encrypter = require("../services/encrypter");

const { User } = require("../models/user.model");
const { City } = require("../models/city.model");
const { Interest } = require("../models/interest.model");

const router = express.Router();

router.get("/initialize", async (req, res, next) => {
    await User.deleteMany({});
    await City.deleteMany({});
    await Interest.deleteMany({});

    fs.readFile(
        __dirname + "/../static/cities.json",
        "utf-8",
        async (err, data) => {
            const cities = JSON.parse(data);
            await City.create(cities);

            await Interest.create(
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
            );

            await User.create({
                login: "materuilist",
                password: await Encrypter.hash("borow123"),
                isOnline: true,
            });

            res.status(201).json({ message: "Initialized successfully" });
        }
    );
});

module.exports = router;
