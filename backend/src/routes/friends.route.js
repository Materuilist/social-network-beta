const express = require("express");

const {
    getFriendsById,
    addFriend,
    deleteFriend,
    getFriends,
    toggleStatus,
    findStrangers,
} = require("../controllers/friends.controller");
const { parseUser } = require("../controllers/shared.controller");

const router = express.Router();

router.post("/search-strangers", parseUser, findStrangers);

router.post("/toggle-status", parseUser, toggleStatus);

router.get("/add/:userId", parseUser, addFriend);

router.get("/:userId", parseUser, getFriendsById);

router.get("/", parseUser, getFriends);

router.delete("/:userId", parseUser, deleteFriend);

module.exports = router;
