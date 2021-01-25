const { Error } = require("../models/shared/error.class");
const { User } = require("../models/user.model");

const togglePhotoLike = async (req, res, next) => {
    const {
        user: { _id: senderId },
        userId,
        photoId,
    } = req.body;

    if (!userId || !senderId || !photoId) {
        return next(new Error(400, "Не хватает данных"));
    }

    try {
        const photoOwner = await User.findById(userId);
        const newPhotos = photoOwner.photos.map((photo) => {
            if (photo._id.toString() === photoId) {
                const isLiked = Boolean(
                    photo.likesFrom.find((likerId) => senderId.toString() === likerId.toString())
                );
                return {
                    _id: photoId,
                    data:photo.data,
                    likesFrom: isLiked
                        ? photo.likesFrom.filter(
                              (likerId) => likerId.toString() !== senderId.toString()
                          )
                        : [...photo.likesFrom, senderId],
                };
            }
            return photo;
        });
        // console.log(newPhotos);
        photoOwner.photos = newPhotos;
        await photoOwner.save();
        return res.status(200).json();
    } catch (ex) {
        // console.log(ex);
        return next(new Error(500, "Что-то пошло не так..."));
    }
};

module.exports = {
    togglePhotoLike,
};
