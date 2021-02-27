import { BaseService } from "./base.service";

export class ChatsService extends BaseService {
    constructor() {
        super();
        this.request = async (url, init, needsAuth = true) =>
            super.request(`chats/${url}`, init, needsAuth);
    }

    getChats() {
        const res = this.request("");
        return res;
    }

    getDialogue(otherUserId, page = 1, itemsCount = 10, skip = 0) {
        if (!otherUserId) return;

        const res = this.request(
            `dialogue/${otherUserId}?page=${page}&itemsCount=${itemsCount}&skip=${skip}`
        );
        return res;
    }
}
