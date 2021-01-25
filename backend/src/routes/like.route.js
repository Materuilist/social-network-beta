const { togglePhotoLike } = require('../controllers/like.controller');

const router = require('express').Router();

const { parseUser } = require("../controllers/shared.controller");

router.post('/toggle-photo-like', parseUser, togglePhotoLike)

module.exports = router;