const router = require("express").Router();

const { parseUser } = require("../controllers/shared.controller");
const {
    getUserInfoById,
    getUserInfo,
    updateUserInfo,
    checkOnline,
} = require("../controllers/user-info.controller");

router.get("/:userId", parseUser, getUserInfoById);

router.get("/", parseUser, getUserInfo);

router.post("/check-online", parseUser, checkOnline);

router.put("/", parseUser, updateUserInfo);

module.exports = router;
