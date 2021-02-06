import { BaseService } from "./base.service";

export class AuthService extends BaseService {
    constructor() {
        super();
        this.request = async (url, init, needsAuth = false) =>
            super.request(`auth/${url}`, init, needsAuth);
    }

    async getUser() {
        const res = this.request("get-user", null, true);
        return res;
    }

    async login(login, password) {
        const res = this.request("signin", {
            method: "POST",
            body: JSON.stringify({ login, password }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        return res;
    }

    async register(login, password) {
        const res = this.request("signup", {
            method: "POST",
            body: JSON.stringify({ login, password }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        return res;
    }
}
