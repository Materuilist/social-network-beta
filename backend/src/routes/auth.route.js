const express = require("express");

const { User } = require("../models/user.model");
const Encrypter = require("../services/encrypter");
const TokenProcessor = require("../services/tokenProcessor");
const { Error } = require("../models/shared/error.class");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
    const { login, phone, password } = req.body;

    if (!login || !password) {
        return next(new Error(400, "Введены не все данные"));
    }

    const sameLoginUsers = await User.find({ login });
    if (sameLoginUsers.length !== 0) {
        return next(
            new Error(400, "Пользователь с таким логином уже существует!")
        );
    }

    if (phone) {
        const samePhoneUsers = await User.find({ phone });
        if (samePhoneUsers.length !== 0) {
            return next(
                new Error(
                    400,
                    "Пользователь с таким номером телефона уже существует!"
                )
            );
        }
    }

    await User.create({
        ...body,
        password: await Encrypter.hash(password),
    });

    res.status(201).json({
        message: "Регистрация прошла успешно!",
        token: await TokenProcessor.getToken(login),
    });
});

router.post("/signin", async (req, res, next) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return next(new Error(400, "Введены не все данные"));
    }

    const user = await User.findOne({ login });
    if (!user) {
        return next(new Error(404, "Пользователя с таким логином нет!"));
    }

    const doPasswordsMatch = await Encrypter.verify(password, user.password);
    if (!doPasswordsMatch) {
        return next(new Error(400, "Неверный пароль!"));
    }

    res.status(200).json({
        message: "Вход прошел успешно!",
        token: await TokenProcessor.getToken(login),
    });
});

router.get("/get-user", async (req, res, next) => {
    const token = req.headers.authorization.split(":")[1];
    const user = await TokenProcessor.decodeToken(token);
    if (!user) {
        return next(new Error(401, "Токен не действителен!"));
    }
    res.status(200).json({ userInfo: { login: user.login } });
});

module.exports = router;
