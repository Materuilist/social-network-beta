const express = require("express");

const TokenProcessor = require("../services/tokenProcessor");
const { User } = require("../models/user.model");
const { Error } = require("../models/shared/error.class");

const router = express.Router();

//список друзей любого пользователя
//авторизация не нужна
//userId - код интересующего юзера
router.get("/list/:userId", async (req, res, next) => {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("friends").exec();
    const { friends } = user;
    console.log(user);
    res.status(200).json({ friends });
});

router.use("/", async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    const token = req.headers.authorization.split(":")[1];
    const user = await TokenProcessor.decodeToken(token);
    if (!user) {
        return next(new Error(401, "Вы не авторизованы!"));
    }
    req.body.user = user;
    next();
});

//userId - код добавляемого юзера
router.post("/add", async (req, res, next) => {
    const friendToAddId = req.body.userId;

    const { login: currentUserLogin } = req.body.user;
    const user = await User.findOne({ login: currentUserLogin });
    const friendToAdd = await User.findById(friendToAddId);

    const isMutual = Boolean(
        user.incomingRequests.find((requester) => requester === friendToAddId)
    );
    if (isMutual) {
        user.incomingRequests.remove(friendToAddId);
        user.friends.push(friendToAddId);
        friendToAdd.outcomingRequests.remove(user._id);
        friendToAdd.friends.push(user._id);
    } else {
        user.outcomingRequests.push(friendToAddId);
        friendToAdd.incomingRequests.push(user._id);
    }

    await Promise.all([user.save(), friendToAdd.save()]);

    return res.status(200).json({
        message: isMutual
            ? `Теперь вы и ${friendToAdd.login} - друзья!`
            : `Заявка пользователю ${friendToAdd.login} успешно отправлена!`,
    });
});

module.exports = router;
