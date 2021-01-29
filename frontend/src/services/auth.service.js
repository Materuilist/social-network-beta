import { BaseService } from "./base.service";

export class AuthService extends BaseService {
    constructor() {
        super()
        this.request = (url, body, headers, needsAuth) =>
            super.request(`userinfo/${url}`, body, headers, needsAuth);
    }

    async getUser(){
        const res = this.request('get-user', null, null, true);
        return res;
    }
}
