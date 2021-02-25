const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");

const getChats = async (req, res, next) => {
    const { user: currentUser } = req.body;

    const { chats } = await currentUser
        .populate({
            path: "chats",
            select: "_id messages members._id",
            populate: [
                {
                    path: "messages",
                    select: "content timestamp sender",
                    options: { sort: { timestamp: -1 } },
                    perDocumentLimit: 1,
                },
                { path: "members._id", select: "login avatar" },
            ],
        })
        .execPopulate();

    res.status(200).json({
        chats: chats.map((chat) => ({
            otherUser: chat.members
                .filter(
                    ({ _id: user }) =>
                        user._id.toString() !== currentUser._id.toString()
                )
                .map(({ _id }) => ({
                    login: _id.login,
                    avatar: _id.avatar,
                    id: _id._id,
                })),
            lastMessage: chat.messages.length > 0 ? chat.messages[0] : null,
        })),
    });
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
