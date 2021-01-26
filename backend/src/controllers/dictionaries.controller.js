const { Error } = require("../models/shared/error.class");
const { City } = require("../models/city.model");
const { statuses } = require("../constants");

const ITEMS_PER_PAGE_DEFAULT = 20;

const getCities = async (req, res, next) => {
    const {
        pageId = 1,
        itemsCount = ITEMS_PER_PAGE_DEFAULT,
        all = false,
    } = req.query;

    const [cities, nextPageExists] = await Promise.all([
        City.find(
            {},
            null,
            all
                ? null
                : {
                      skip: (pageId - 1) * itemsCount,
                      limit: +itemsCount,
                  }
        ),
        all
            ? Promise.resolve(false)
            : City.countDocuments().then(
                  (count) => count > pageId * itemsCount
              ),
    ]);

    res.status(200).json({
        data: cities.map(({ _id, name }) => ({ id: _id, name })),
        nextPageExists,
    });
};

const getFriendsStatuses = async (req, res, next) => {
    res.status(200).json({
        data: statuses,
    });
};

module.exports = {
    getCities,
    getFriendsStatuses,
};
