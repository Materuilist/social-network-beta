import { BaseService } from "./base.service";

export class UserService extends BaseService {
    constructor() {
        super(true);
    }

    async request(url, options) {
        return super.request(`userinfo/${url}`, options);
    }

    async getInfo(userId) {
        return this.request(`${userId || ""}`);
    }

    async updateInfo(data) {
        return this.request("", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }
}
