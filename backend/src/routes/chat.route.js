const { getChats } = require("../controllers/chat.controller");
const { parseUser } = require("../controllers/shared.controller");

const router = require("express").Router();

router.get("/", parseUser, getChats);

module.exports = router;
