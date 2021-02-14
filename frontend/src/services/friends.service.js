import { BaseService } from "./base.service";

export class FriendsService extends BaseService {
    constructor() {
        super();
        this.request = async (url = "", init = null, needsAuth = true) =>
            super.request(`friends/${url}`, init, needsAuth);
    }

    // ************************ common info ************************
    async getInfo() {
        const res = this.request();
        return res;
    }
}
