import { BaseService } from "./base.service";

export class UserInfoService extends BaseService {
    constructor() {
        super();
        this.request = async (url = '', init = null, needsAuth = true) =>
            super.request(`userinfo/${url}`, init, needsAuth);
    }

    async getInfo() {
        const res = this.request();
        return res;
    }
}
