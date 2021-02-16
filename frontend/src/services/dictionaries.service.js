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

    async getAvailableInterests() {
        const res = this.request("interests", null, true);
        return res;
    }

    async getFriendsStatuses() {
        const res = await this.request("statuses");
        if (res && res.data) {
            const images = await Promise.all(
                res.data.map(({ imageName }) =>
                    super.request(
                        `images/friendsStatuses/${imageName}`,
                        null,
                        false,
                        "blob"
                    )
                )
            );
            if (images && images.length) {
                return {
                    data: res.data.map(({ _id, name }, index) => ({
                        id: _id,
                        name,
                        icon: images[index],
                    })),
                };
            }
        }
        return res;
    }
}
