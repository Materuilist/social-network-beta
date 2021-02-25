const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");

const getChats = async (req, res, next) => {
    const { user } = req.body;

    const { chats } = await user
        .populate({
            path: "chats",
            select: "_id messages",
            populate: {
                path: "messages",
                select: "content timestamp",
                options: { sort: { timestamp: -1 } },
                perDocumentLimit: 1,
            },
        })
        .execPopulate();

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
