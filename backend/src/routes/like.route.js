const router = require('express').Router();

const { togglePhotosLikes } = require('../controllers/like.controller');
const { parseUser } = require("../controllers/shared.controller");

router.post('/toggle-photos-likes', parseUser, togglePhotosLikes)

module.exports = router;