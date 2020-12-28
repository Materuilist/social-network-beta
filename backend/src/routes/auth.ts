import express from "express";

import { IUser } from "../interfaces/entities/user.interface";
import { Error } from "../interfaces/common/error.class";
import { User } from "../models/user";
import { Encrypter } from "../services/encrypter";
import { TokenProcessor } from "../services/tokenProcessor";
import { ISigninDto } from "../interfaces/dto/in/signin.dto.interface";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
    const body = req.body as IUser;
    if (!body) {
        return next(new Error(400, "Введены не все данные"));
    }

    const { login, phone, password } = body;

    const sameLoginUsers: IUser[] = await User.find({ login });
    if (sameLoginUsers.length !== 0) {
        return next(
            new Error(400, "Пользователь с таким логином уже существует!")
        );
    }

    if (phone) {
        const samePhoneUsers: IUser[] = await User.find({ phone });
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
    const body = req.body as ISigninDto;
    if (!body) {
        return next(new Error(400, "Введены не все данные"));
    }

    const { login, password } = body;

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
    res.status(200).json({ userInfo: user });
});

export default router;
