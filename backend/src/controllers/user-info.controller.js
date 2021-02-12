const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");
const { Interest } = require("../models/interest.model");
const filterBody = require("../utils/filterBody");

const getUserInfoById = async (req, res, next) => {
    const { userId } = req.params;
    const userInfo = await User.findById(userId)
        .populate("city", "_id name")
        .exec();

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
    const userInfo = await User.findOne({ login });

    if (!userInfo) {
        return next(new Error(400, "Ошибка при получении пользователя!"));
    }
    const { avatar, sex, birthDate, city, isOnline } = userInfo;
    return res
        .status(200)
        .json({
            login,
            avatar,
            sex,
            birthDate: birthDate && birthDate.toISOString().split("T")[0],
            city,
            isOnline,
        });
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

const setOnline = async (req, res, next) => {
    const { user, isOnline } = req.body;

    console.log(isOnline);
    await user.updateOne({ isOnline });
    res.status(200).json({
        message: `${user.login} - ${isOnline ? "онлайн" : "оффлайн"}`,
    });
};

const updateUserInfo = async (req, res, next) => {
    const { user, sex, city, birthDate, avatar } = req.body;

    const filteredInfo = filterBody({ sex, city, birthDate, avatar });

    try {
        await user.updateOne(filteredInfo);

        res.status(200).json({ message: "Сохранение прошло успешно!" });
    } catch {
        return next(new Error(400, "Ошибка сохранения!"));
    }
};

const getPhotosById = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return next(new Error(400, "Ошибка получения пользователя"));
        }
        const mappedPhotos = user.photos.map(({ _id, data, likesFrom }) => ({
            _id,
            data,
            likesCount:
                likesFrom && likesFrom.length > 0 ? likesFrom.length : 0,
        }));

        res.status(200).json({ photos: mappedPhotos });
    } catch {
        return next(new Error(400, "Ошибка получения пользователя"));
    }
};

const getPhotos = async (req, res, next) => {
    const { user } = req.body;

    const mappedPhotos = user.photos.map(({ _id, data, likesFrom }) => ({
        _id,
        data,
        likesCount: likesFrom && likesFrom.length > 0 ? likesFrom.length : 0,
    }));

    res.status(200).json({ photos: mappedPhotos });
};

const addPhotos = async (req, res, next) => {
    const { user, photos = [] } = req.body;

    if (!photos || photos.length === 0) {
        return next(new Error(400, "Ошибка сохранения!"));
    }

    try {
        user.photos = [
            ...user.photos,
            ...photos.map((photoEncoded) => ({
                data: photoEncoded,
                likesFrom: [],
            })),
        ];
        await user.save();
        return res
            .status(201)
            .json({ message: `Добавлено ${photos.length} фото!` });
    } catch {
        return next(new Error(500, "Ошибка сохранения!"));
    }
};

const deletePhotos = async (req, res, next) => {
    const { user, photos = [] } = req.body;

    if (!photos || photos.length === 0) {
        return next(new Error(400, "Ошибка сохранения!"));
    }

    try {
        user.photos = user.photos.filter(
            ({ _id }) =>
                !photos.find(
                    (excessivePhoto) => excessivePhoto === _id.toString()
                )
        );
        await user.save();
        return res
            .status(200)
            .json({ message: `Удалено ${photos.length} фото!` });
    } catch {
        return next(new Error(500, "Ошибка сохранения!"));
    }
};

const getInterestsById = async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        return next(new Error(404, "Такого пользователя нет!"));
    }

    const { interests } = await user
        .populate("interests", "_id naming")
        .execPopulate();
    res.status(200).json({ interests });
};

const getInterests = async (req, res, next) => {
    const { user } = req.body;

    const { interests } = await user
        .populate("interests", "_id naming")
        .execPopulate();
    res.status(200).json({ interests });
};

const addInterests = async (req, res, next) => {
    const {
        user,
        newInterests = [], //названия придуманных юзером интересов
        existingInterests = [], //id интересов, существовавших в перечне дефолтных
    } = req.body;

    const interestsToAdd = [];
    const interestsDictionary = await Interest.find();

    if (newInterests && newInterests.length > 0) {
        if (
            newInterests.filter(
                (interestName) =>
                    !interestsDictionary.find(
                        ({ naming, owner }) =>
                            (!owner ||
                                owner.toString() === user._id.toString()) &&
                            naming === interestName
                    )
            ).length !== newInterests.length
        ) {
            return next(new Error(400, "Добавляемые интересы уже есть!"));
        }
        interestsToAdd.push(
            ...(
                await Interest.create(
                    newInterests.map((naming) => ({ naming, owner: user._id }))
                )
            ).map(({ _id }) => _id)
        );
    }

    if (existingInterests && existingInterests.length !== 0) {
        if (
            existingInterests.filter(
                (interestId) =>
                    !user.interests.find((id) => id.toString() === interestId)
            ).length !== existingInterests.length
        ) {
            return next(new Error(400, "Добавляемые интересы уже есть!"));
        }
        interestsToAdd.push(...existingInterests);
    }

    try {
        user.interests = [...user.interests, ...interestsToAdd];
        await user.save();
        return res.status(201).json({
            message: `Было добавлено ${interestsToAdd.length} интересов!`,
        });
    } catch {
        return next(new Error(500, "Ошибка при добавлении..."));
    }
};

const deleteInterests = async (req, res, next) => {
    const { user, interests = [] } = req.body;

    if (user.interests.length === 0) {
        return next(new Error(400, "Пользователь не указал свои интересы"));
    }
    if (!interests || !interests.length || interests.length === 0) {
        return next(new Error(400, "Плохой запрос"));
    }

    try {
        user.interests = user.interests.filter(
            (interestId) =>
                !interests.find((id) => id === interestId.toString())
        );
        await user.save();
        await Interest.deleteMany({
            owner: user._id,
            _id: {
                $in: interests,
            },
        });
        return res
            .status(200)
            .json({ message: `Удалено ${interests.length} интересов...` });
    } catch {
        return next(new Error(500, "ЧТо-то пошло не так..."));
    }
};

module.exports = {
    getUserInfoById,
    getUserInfo,
    updateUserInfo,
    checkOnline,
    setOnline,

    getPhotos,
    getPhotosById,
    addPhotos,
    deletePhotos,

    getInterests,
    getInterestsById,
    addInterests,
    deleteInterests,
};
