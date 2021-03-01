module.exports = {
    database:
        "mongodb://localhost:27017/sn-beta?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    salt: 12,
    token: {
        duration: "2h",
        privateKey: "borowisimo",
    },
};
