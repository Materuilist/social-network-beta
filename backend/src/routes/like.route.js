const router = require('express').Router();

const { togglePhotoLike } = require('../controllers/like.controller');
const { parseUser } = require("../controllers/shared.controller");

router.post('/toggle-photo-like', parseUser, togglePhotoLike)

module.exports = router;