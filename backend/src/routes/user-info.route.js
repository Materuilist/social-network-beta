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
    getInterests,
    addInterests,
    deleteInterests,
    getInterestsById,
    setOnline,
    getPhotosById,
} = require("../controllers/user-info.controller");

router.post("/photos/add", parseUser, addPhotos);

router.get("/photos/:userId", parseUser, getPhotosById);

router.get("/photos", parseUser, getPhotos);

router.delete("/photos", parseUser, deletePhotos);

router.post("/interests/add", parseUser, addInterests);

router.get("/interests/:userId", parseUser, getInterestsById);

router.get("/interests", parseUser, getInterests);

router.delete("/interests", parseUser, deleteInterests);

router.get("/:userId", parseUser, getUserInfoById);

router.get("/", parseUser, getUserInfo);

router.post("/check-online", parseUser, checkOnline);

router.post("/set-online", parseUser, setOnline);

router.put("/", parseUser, updateUserInfo);

module.exports = router;
