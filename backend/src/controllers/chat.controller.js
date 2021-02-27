const { Chat } = require("../models/chat.model");
const { Error } = require("../models/shared/error.class");

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
                { path: "members._id", select: "login avatar isOnline" },
            ],
        })
        .execPopulate();

    res.status(200).json({
        chats: chats.map((chat) => ({
            id: chat._id,
            otherUser: chat.members
                .filter(
                    ({ _id: user }) =>
                        user._id.toString() !== currentUser._id.toString()
                )
                .map(({ _id }) => ({
                    login: _id.login,
                    avatar: _id.avatar,
                    isOnline: _id.isOnline,
                    id: _id._id,
                }))[0],
            lastMessage: chat.messages.length > 0 ? chat.messages[0] : null,
        })),
    });
};

const getDialogue = async (req, res, next) => {
    const { user: currentUser } = req.body;
    const { userId } = req.params;
    let { page = 1, itemsCount = 10 } = req.query;
    page = +page;
    itemsCount = +itemsCount;

    if (!userId) {
        return next(new Error(404, "Не указан собеседник"));
    }

    const chat = await Chat.findOne({
        $and: [{ "members._id": currentUser._id }, { "members._id": userId }],
    });
    let dialogueInfo = null;
    const nextPageExists = chat
        ? chat.messages.length > (page - 1) * itemsCount + itemsCount
        : false;

    if (chat) {
        dialogueInfo = await chat
            .populate([
                {
                    path: "members._id",
                    select: "login avatar isOnline",
                    populate: [
                        {
                            path: "messages",
                            select: "content timestamp sender",
                            options: { sort: { timestamp: -1 } },
                            perDocumentLimit: 1,
                        },
                        {
                            path: "members._id",
                            select: "login avatar isOnline",
                        },
                    ],
                },
                {
                    path: "messages",
                    select: "content timestamp sender",
                    options: { sort: { timestamp: -1 } },
                    skip: (page - 1) * itemsCount,
                    perDocumentLimit: itemsCount,
                },
            ])
            .execPopulate()
            .then((rawInfo) => ({
                id: rawInfo.id,
                otherUser: rawInfo.members
                    .filter(
                        ({ _id: user }) =>
                            user._id.toString() !== currentUser._id.toString()
                    )
                    .map(({ _id }) => ({
                        login: _id.login,
                        avatar: _id.avatar,
                        isOnline: _id.isOnline,
                        id: _id._id,
                    }))[0],
                messages: {
                    data: rawInfo.messages,
                },
            }));
        dialogueInfo.messages.nextPageExists = nextPageExists;
    }

    return res.status(200).json({ data: dialogueInfo });
};

module.exports = {
    getChats,
    getDialogue,
};
