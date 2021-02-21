import { BaseService } from "./base.service";

export class LikesService extends BaseService {
    constructor() {
        super();
        this.request = async (url = "", init = null, needsAuth = true) =>
            super.request(`like/${url}`, init, needsAuth);
    }

    async togglePhotosLikes(userId, photosIds) {
        if (!userId || !photosIds || !photosIds.length) return;

        const res = this.request("toggle-photos-likes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, photosIds }),
        });
    }
}
