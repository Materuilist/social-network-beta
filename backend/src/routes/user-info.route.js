const router = require("express").Router();
const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");
const TokenProcessor = require("../services/tokenProcessor");

router.get("/:userId", async (req, res, next) => {
    const { userId } = req.params;
    const userInfo = await User.findById(userId);

    if (!userInfo) {
        return next(new Error(400, "Такого пользователя нет!"));
    }
    const { login, avatar, sex, phone, city, interests } = userInfo;
    return res.status(200).json({ login, avatar, sex, phone, city, interests });
});

router.get("/", async (req, res, next) => {
    const token = req.headers.authorization.split(":")[1];
    const { login } = await TokenProcessor.decodeToken(token);
    const userInfo = await User.findOne({ login }).populate("city").exec();
    console.log(userInfo)

    if (!userInfo) {
        return next(new Error(400, "Ошибка при получении пользователя!"));
    }
    const { avatar, sex, age, phone, city, interests } = userInfo;
    return res.status(200).json({ login, avatar, sex, age, phone, city, interests });
});

router.put("/", async (req, res, next) => {
    const token = req.headers.authorization.split(":")[1];
    const { login } = await TokenProcessor.decodeToken(token);
    const user = await User.findOne({ login });

    if (!user) {
        return next(new Error(400, "Ошибка при получении пользователя!"));
    }

    try {
        await user.updateOne({ ...req.body });

        res.status(200).json({ message: "Сохранение прошло успешно!" });
    } catch {
        res.status(400).json({ message: "Ошибка сохранения..." });
    }
});

module.exports = router;
