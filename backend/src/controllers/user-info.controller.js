const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");
const filterBody = require("../utils/filterBody");

const getUserInfoById = async (req, res, next) => {
    const { userId } = req.params;
    const userInfo = await User.findById(userId).populate("city", '_id name').exec();

    if (!userInfo) {
        return next(new Error(400, "Такого пользователя нет!"));
    }
    const { login, avatar, birthDate, sex, city, isOnline } = userInfo;
    return res
        .status(200)
        .json({ login, avatar, birthDate, sex, city, isOnline });
};

const getUserInfo = async (req, res, next) => {
    const { login } = req.body.user;
    const userInfo = await User.findOne({ login }).populate("city", '_id name').exec();

    if (!userInfo) {
        return next(new Error(400, "Ошибка при получении пользователя!"));
    }
    const { avatar, sex, birthDate, city, isOnline } = userInfo;
    return res
        .status(200)
        .json({ login, avatar, sex, birthDate, city, isOnline });
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
    const { user, sex, city, birthDate } = req.body;

    const filteredInfo = filterBody({ sex, city, birthDate });

    try {
        await user.updateOne(filteredInfo);

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
