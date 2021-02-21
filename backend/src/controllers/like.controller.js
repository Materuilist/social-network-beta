const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");

const togglePhotosLikes = async (req, res, next) => {
    const {
        user: { _id: senderId },
        userId,
        photosIds = [], //фото, лайк на которых нужно cнять/поставить
    } = req.body;

    if (!userId || !senderId || !photosIds || !photosIds.length) {
        return next(new Error(400, "Не хватает данных"));
    }

    try {
        const photoOwner = await User.findById(userId);
        const newPhotos = photoOwner.photos.map((photo) => {
            const needsLikeToggle = Boolean(
                photosIds.find(
                    (photoToToggleId) =>
                        photoToToggleId === photo._id.toString()
                )
            );
            if (needsLikeToggle) {
                const isLiked = Boolean(
                    photo.likesFrom.find(
                        (likerId) => senderId.toString() === likerId.toString()
                    )
                );
                return {
                    _id: photo._id,
                    data: photo.data,
                    likesFrom: isLiked
                        ? photo.likesFrom.filter(
                              (likerId) =>
                                  likerId.toString() !== senderId.toString()
                          )
                        : [...photo.likesFrom, senderId],
                };
            }
            return photo;
        });
        photoOwner.photos = newPhotos;
        await photoOwner.save();
        return res
            .status(200)
            .json({ message: "Лайки успешно сняты/поставлены" });
    } catch (ex) {
        return next(new Error(500, "Что-то пошло не так..."));
    }
};

module.exports = {
    togglePhotosLikes,
};
