const { compare, hash } = require("bcrypt");

const config = require("../utils/getConfig")();

module.exports = class Encrypter {
    constructor() {}

    static async hash(value) {
        return await hash(value, config.salt);
    }

    static async verify(value, encrypted) {
        return await compare(value, encrypted);
    }
};
