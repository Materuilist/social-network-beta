import { ChatsService } from "../../services/chats.service";
import { chatActionTypes } from "../actionTypes";

const chatsService = new ChatsService();

const setChatId = (chatId = null) => ({
    type: chatActionTypes.SET_CHAT_ID,
    payload: chatId,
});
const setOtherUser = (userInfo = null) => ({
    type: chatActionTypes.SET_OTHER_USER,
    payload: userInfo,
});
const setMessages = (messages = [], nextPageExists = true) => ({
    type: chatActionTypes.SET_MESSAGES,
    payload: { data: messages, nextPageExists },
});

export const getDialogue = (otherUserId, pageIndex = 1, cb) => async (
    dispatch,
    getState
) => {
    if (!otherUserId) return;

    const res = await chatsService.getDialogue(otherUserId, pageIndex);
    if (res && res.data) {
        const { id = null, otherUser = null, messages = [] } = res.data;
        const {
            chat: {
                messages: { data: currentMessages },
            },
        } = getState();

        dispatch(setChatId(id));
        dispatch(setOtherUser(otherUser));
        dispatch(
            setMessages(
                pageIndex === 1
                    ? messages
                    : [...currentMessages, ...messages.data],
                messages.nextPageExists
            )
        );
    }

    cb?.();
};
