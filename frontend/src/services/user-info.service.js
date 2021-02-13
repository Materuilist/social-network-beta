import { BaseService } from "./base.service";

export class UserInfoService extends BaseService {
    constructor() {
        super();
        this.request = async (url = "", init = null, needsAuth = true) =>
            super.request(`userinfo/${url}`, init, needsAuth);
    }

    // ************************ common info ************************
    async getInfo() {
        const res = this.request();
        return res;
    }

    async updateAvatar(avatarBinary) {
        const res = this.request("", {
            method: "PUT",
            body: JSON.stringify({ avatar: avatarBinary }),
            headers: { "Content-Type": "application/json" },
        });
        return res;
    }

    async updateInfo(info) {
        const res = this.request("", {
            method: "PUT",
            body: JSON.stringify(info),
            headers: { "Content-Type": "application/json" },
        });
        return res;
    }
    // ************************ end common info ************************

    // ************************ hobbies ************************
    async getHobbies(userId = "") {
        const res = this.request(`interests/${userId}`);
        return res;
    }

    async addHobbies(newHobbies = [], existingHobbies = []) {
        const res = this.request("interests/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newInterests: newHobbies,
                existingInterests: existingHobbies,
            }),
        });
        return res;
    }

    async deleteHobbies(hobbyIds = []) {
        const res = this.request("interests", {
            method: "DELETE",
            body: JSON.stringify({
                interests: hobbyIds,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res;
    }
    // ************************ end hobbies ************************

    // ************************ photos ************************
    async getPhotos() {
        const res = this.request("photos");
        return res;
    }

    async addPhotos(photos = []) {
        const res = this.request("photos/add", {
            method: "POST",
            body: JSON.stringify({ photos }),
            headers: { "Content-Type": "application/json" },
        });
        return res;
    }
    // ************************ end photos ************************
}
