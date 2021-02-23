const getChats = async (req, res, next) => {
    const { user } = req.body;

    const { chats } = user;

    res.status(200).json({ chats });
};

module.exports = {
    getChats,
};
