import { BaseService } from "./base.service";
import { concatQueryString } from "../helpers";

export class DictionariesService extends BaseService {
    constructor() {
        super(false);
    }

    async request(url, options) {
        return super.request(`dictionaries/${url}`, options);
    }

    async getCities(pageId, itemsCount, all = true) {
        return this.request(
            `cities${concatQueryString({ pageId, itemsCount, all })}`
        );
    }
}
