const { Types } = require("mongoose");
const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");

const findStrangers = async (req, res, next) => {
    const {
        user,
        searchText = "",
        searchParams: { city, interests, ageBottom, ageTop, sex } = {},
        page: { index: pageIndex = 1, itemsCount = 20 } = {},
    } = req.body;

    let query = {
        _id: { $ne: user._id },
        login: {
            $regex: new RegExp(searchText),
        },
    };
    city && (query = { ...query, city });
    interests &&
        interests.length &&
        (query = { ...query, interests: { $all: interests } });
    sex && (query = { ...query, sex });
    if (ageBottom || ageTop) {
        const today = new Date();
        const birthBottom = new Date(
            today.getFullYear() - (ageBottom ?? 0),
            today.getMonth(),
            today.getDate()
        );
        const birthTop = new Date(
            today.getFullYear() - (ageTop ?? 140),
            today.getMonth(),
            today.getDate()
        );
        query = {
            ...query,
            birthDate: { $gte: birthTop, $lte: birthBottom },
        };
    }

    const users = await User.find(query, null, {
        skip: (pageIndex - 1) * itemsCount,
        limit: itemsCount + 1, //для параметра nextPageExists
    });

    return res.status(200).json({
        data: users.slice(0, itemsCount),
        nextPageExists: users.length > itemsCount,
    });
};

const getFriendsById = async (req, res, next) => {
    const userId = req.params.userId;

    const { friends } = await User.findById(userId)
        .populate("friends.data", "login isOnline")
        .exec();

    res.status(200).json({
        friends: friends.map((friend) => ({
            id: friend.data._id,
            login: friend.data.login,
            isOnline: friend.data.isOnline,
        })),
    });
};

const getFriends = async (req, res, next) => {
    const { user } = req.body;

    const { friends } = await user
        .populate("friends.data", "login isOnline")
        .populate("friends.statuses", "_id name")
        .execPopulate();
    res.status(200).json({
        friends: friends.map((friend) => ({
            id: friend.data._id,
            login: friend.data.login,
            birthDate: friend.data.birthDate,
            avatar: friend.data.avatar,
            isOnline: friend.data.isOnline,
            statuses: friend.statuses,
        })),
    });
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
        user.friends.push({ data: friendToAddId });
        friendToAdd.outcomingRequests.remove(user._id);
        friendToAdd.friends.push({ data: user._id });
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

    user.friends = user.friends.filter(
        (friend) => friend.data.toString() !== userToDeleteId
    );
    user.incomingRequests.push(userToDeleteId);

    userToDelete.friends = userToDelete.friends.filter(
        (friend) => friend.data.toString() !== user._id.toString()
    );
    userToDelete.outcomingRequests.push(user._id);

    await Promise.all([user.save(), userToDelete.save()]);
    return res
        .status(200)
        .json({ message: `${userToDelete.login} успешно удален.` });
};

const toggleStatus = async (req, res, next) => {
    const { user: currentUser, userId, statusId } = req.body;

    if (!userId || !statusId) {
        return next(new Error(400, "Не корректный запрос"));
    }

    currentUser.friends = currentUser.friends.map((friend) =>
        friend.data.toString() === userId
            ? {
                  data: friend.data,
                  statuses: friend.statuses.find(
                      (existingStatusId) =>
                          existingStatusId.toString() === statusId
                  )
                      ? friend.statuses.filter(
                            (existingStatusId) =>
                                existingStatusId.toString() !== statusId
                        )
                      : [...friend.statuses, statusId],
              }
            : friend
    );

    await currentUser.save();

    res.status(200).json({ message: "Успешно изменено наличие статуса." });
};

module.exports = {
    findStrangers,
    getFriendsById,
    getFriends,
    addFriend,
    deleteFriend,
    toggleStatus,
};
