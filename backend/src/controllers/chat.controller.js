const { Error } = require("../models/shared/error.class");

const getChats = async (req, res, next) => {
    const { user } = req.body;

    const { chats } = user;

    res.status(200).json({ chats });
};

const getDialogue = async (req, res, next) => {
    const { user: currentUser } = req.body;
    const { userId } = req.params;

    if (!userId) {
        return next(new Error(404, "Не указан собеседник"));
    }

    const result = await currentUser.populate("chats").execPopulate();

    return res.status(200).json({ data: result });
};

module.exports = {
    getChats,
    getDialogue,
};
