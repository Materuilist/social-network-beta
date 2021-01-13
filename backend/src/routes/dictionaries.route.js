const router = require("express").Router();

const { City } = require("../models/city.model");

const ITEMS_PER_PAGE_DEFAULT = 20;

router.get("/cities", async (req, res, next) => {
    const {
        pageId = 1,
        itemsCount = ITEMS_PER_PAGE_DEFAULT,
        all = "false",
    } = req.query;

    const cities = await City.find(
        {},
        null,
        all
            ? null
            : {
                  skip: (pageId - 1) * itemsCount,
                  limit: +itemsCount,
              }
    );

    res.status(200).json(cities.map(({ _id, name }) => ({ id: _id, name })));
});

module.exports = router;
