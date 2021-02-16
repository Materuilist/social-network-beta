import { BaseService } from "./base.service";

export class FriendsService extends BaseService {
    constructor() {
        super();
        this.request = async (url = "", init = null, needsAuth = true) =>
            super.request(`friends/${url}`, init, needsAuth);
    }

    async getCurrentFriends() {
        const res = this.request();
        return res;
    }

    async getStrangers(
        searchText = "",
        searchParams = {},
        page = 1,
        itemsCount = 50
    ) {
        const res = this.request("search-strangers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                searchText,
                searchParams,
                page: {
                    index: page,
                    itemsCount,
                },
            }),
        });
        return res;
    }
}
