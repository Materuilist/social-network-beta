const express = require("express");

const { getFriendsById, addFriend, deleteFriend, getFriends } = require("../controllers/friends.controller");
const { parseUser } = require("../controllers/shared.controller");

const router = express.Router();

router.get("/add/:userId", parseUser, addFriend);

router.get("/:userId", parseUser, getFriendsById);

router.get("/", parseUser, getFriends);

router.delete("/:userId", parseUser, deleteFriend);

module.exports = router;
