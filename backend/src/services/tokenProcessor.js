const { sign, verify, decode } = require("jsonwebtoken");

const config = require("../utils/getConfig")();

module.exports = class TokenProcessor {
    static async getToken(login) {
        return await sign({ login }, config.token.privateKey, {
            expiresIn: config.token.duration,
        });
    }

    static async verifyToken(verifiedLogin, token) {
        try {
            await verify(token, config.token.privateKey);
            return true;
        } catch {
            return false;
        }
    }

    static async decodeToken(token) {
        try {
            const userPayload = await decode(token);
            return userPayload;
        } catch {
            return null;
        }
    }
};
