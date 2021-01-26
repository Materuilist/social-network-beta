const {
    getCities,
    getFriendsStatuses,
} = require("../controllers/dictionaries.controller");

const router = require("express").Router();

router.get("/cities", getCities);

router.get("/statuses", getFriendsStatuses);

module.exports = router;
