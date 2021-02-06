import { BaseService } from "./base.service";

export class UserInfoService extends BaseService {
    constructor() {
        super();
        this.request = async (url = "", init = null, needsAuth = true) =>
            super.request(`userinfo/${url}`, init, needsAuth);
    }

    async getInfo() {
        const res = this.request();
        return res;
    }

    async updateAvatar(avatarBinary) {
        const res = this.request("", {
            method: "PUT",
            body: JSON.stringify({ avatar: avatarBinary }),
            headers: { "Content-Type": "application/json" },
        });
        return res;
    }
}
