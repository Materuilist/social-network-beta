import { ChatsService } from "../../services/chats.service";

const chatsService = new ChatsService();

export const getDialogue = (otherUserId, cb) => async (dispatch) => {
    if (!otherUserId) return;

    const res = await chatsService.getDialogue(otherUserId);
    console.log(res);
};
