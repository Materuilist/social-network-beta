const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");

const getUserInfoById = async (req, res, next) => {
    const { userId } = req.params;
    const userInfo = await User.findById(userId);

    if (!userInfo) {
        return next(new Error(400, "Такого пользователя нет!"));
    }
    const { login, avatar, sex, phone, city, interests, isOnline } = userInfo;
    return res
        .status(200)
        .json({ login, avatar, sex, phone, city, interests, isOnline });
};

const getUserInfo = async (req, res, next) => {
    const { login } = req.body.user;
    const userInfo = await User.findOne({ login }).populate("city").exec();

    if (!userInfo) {
        return next(new Error(400, "Ошибка при получении пользователя!"));
    }
    const { avatar, sex, age, phone, city, interests, isOnline } = userInfo;
    return res
        .status(200)
        .json({ login, avatar, sex, age, phone, city, interests, isOnline });
};

const checkOnline = async (req, res, next) => {
    const { user, ids = [] } = req.body;
    if (typeof ids.length === "number" && ids.length > 0) {
        const otherUsersStatuses = await User.find(
            {
                _id: {
                    $in: ids,
                },
            },
            "_id isOnline"
        );
        return res.status(200).json({
            self: { isOnline: user.isOnline },
            others: otherUsersStatuses,
        });
    }
    return res.status(200).json({
        self: { isOnline: user.isOnline },
    });
};

const updateUserInfo = async (req, res, next) => {
    const { login } = req.body.user;
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
};

module.exports = {
    getUserInfoById,
    getUserInfo,
    checkOnline,
    updateUserInfo,
};
