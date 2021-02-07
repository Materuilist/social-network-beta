import { BaseService } from "./base.service";

export class DictionariesService extends BaseService {
    constructor() {
        super();
        this.request = async (url, init, needsAuth = false) =>
            super.request(`dictionaries/${url}`, init, needsAuth);
    }

    async getCities() {
        const res = this.request("cities?all=true");
        return res;
    }
}
