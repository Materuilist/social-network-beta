const {
    getCities,
    getFriendsStatuses,
    getInterests,
} = require("../controllers/dictionaries.controller");

const { parseUser } = require("../controllers/shared.controller");

const router = require("express").Router();

router.get("/cities", getCities);

router.get("/statuses", getFriendsStatuses);

router.get("/interests", parseUser, getInterests);

module.exports = router;
