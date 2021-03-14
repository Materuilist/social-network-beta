const TokenProcessor = require("../services/tokenProcessor");
const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");

const parseUser = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(new Error(401, "Ошибка при получении пользователя!"));
    }
    const token = req.headers.authorization.split(" ")[1];
    const { login } = await TokenProcessor.decodeToken(token);
    const user = await User.findOne({ login });

    if (!user) {
        return next(new Error(401, "Ошибка при получении пользователя!"));
    }

    req.body.user = user;
    next();
};

module.exports = {
    parseUser
};
