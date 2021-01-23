const router = require("express").Router();

const { parseUser } = require("../controllers/shared.controller");
const {
    getUserInfoById,
    getUserInfo,
    updateUserInfo,
    checkOnline,
    getPhotos,
    addPhotos,
    deletePhotos,
} = require("../controllers/user-info.controller");

router.post("/photos/add", parseUser, addPhotos);

router.get("/photos", parseUser, getPhotos);

router.delete("/photos", parseUser, deletePhotos);

router.get("/:userId", parseUser, getUserInfoById);

router.get("/", parseUser, getUserInfo);

router.post("/check-online", parseUser, checkOnline);

router.put("/", parseUser, updateUserInfo);

module.exports = router;
