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
}
