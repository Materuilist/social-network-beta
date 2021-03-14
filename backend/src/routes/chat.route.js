const { getChats, getDialogue } = require("../controllers/chat.controller");
const { parseUser } = require("../controllers/shared.controller");

const router = require("express").Router();

router.get("/dialogue/:userId", parseUser, getDialogue);

router.get("/", parseUser, getChats);

module.exports = router;
