const express = require("express");

const { getUser, signIn, signUp } = require("../controllers/auth.controller");
const { parseUser } = require("../controllers/shared.controller");

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/get-user", parseUser, getUser);

module.exports = router;
