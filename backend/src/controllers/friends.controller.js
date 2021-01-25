const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");

const getFriendsById = async (req, res, next) => {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("friends", "login isOnline").exec();
    const { friends } = user;
    res.status(200).json({ friends });
};

const getFriends = async (req, res, next) => {
    const { user } = req.body;

    const { friends } = await user.populate("friends", "login isOnline").execPopulate();
    res.status(200).json({ friends });
};

const addFriend = async (req, res, next) => {
    const { user } = req.body;
    const { userId: friendToAddId } = req.params;

    const friendToAdd = await User.findById(friendToAddId);

    const isMutual = Boolean(
        user.incomingRequests.find(
            (requester) => requester.toString() === friendToAddId
        )
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

    try {
        await Promise.all([user.save(), friendToAdd.save()]);
        return res.status(200).json({
            message: isMutual
                ? `Теперь вы и ${friendToAdd.login} - друзья!`
                : `Заявка пользователю ${friendToAdd.login} успешно отправлена!`,
        });
    } catch {
        return next(new Error(500, "Что-то пошло не так..."));
    }
};

const deleteFriend = async (req, res, next) => {
    const { user } = req.body;
    const { userId: userToDeleteId } = req.params;

    const userToDelete = await User.findById(userToDeleteId);
    if (!userToDelete) {
        return next(new Error(404, "Пользователь не найден."));
    }

    user.friends.remove(userToDeleteId);
    user.incomingRequests.push(userToDeleteId);

    userToDelete.friends.remove(user._id);
    userToDelete.outcomingRequests.push(user._id);

    await Promise.all([user.save(), userToDelete.save()]);
    return res
        .status(200)
        .json({ message: `${userToDelete.login} успешно удален.` });
};

module.exports = {
    getFriendsById,
    getFriends,
    addFriend,
    deleteFriend,
};
