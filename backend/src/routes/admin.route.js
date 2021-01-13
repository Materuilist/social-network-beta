const fs = require("fs");

const express = require("express");
const Encrypter = require("../services/encrypter");

const { User } = require("../models/user.model");
const { City } = require("../models/city.model");
const { Types } = require("mongoose");

const router = express.Router();

router.get("/initialize", async (req, res, next) => {
    await User.deleteMany({});
    await City.deleteMany({});

    fs.readFile(
        __dirname + "/../static/cities.json",
        "utf-8",
        async (err, data) => {
            const cities = JSON.parse(data);
            await City.create(cities);

            await User.create({
                login: "Admin",
                password: await Encrypter.hash("admin123"),
            });

            await User.create({
                login: "materuilist",
                password: await Encrypter.hash("borow123"),
                sex: "M",
                age: 20,
            });

            res.status(201).json({ message: "Initialized successfully" });
        }
    );
});

module.exports = router;
