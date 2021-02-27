import { ChatsService } from "../../services/chats.service";
import { wsService } from "../../services/ws.service";
import { chatActionTypes } from "../actionTypes";

const chatsService = new ChatsService();

export const clear = () => ({
    type: chatActionTypes.CLEAR,
});

const setOtherUserId = (userId = null) => ({
    type: chatActionTypes.SET_OTHER_USER_ID,
    payload: userId,
});
const setChatId = (chatId = null) => ({
    type: chatActionTypes.SET_CHAT_ID,
    payload: chatId,
});
const setOtherUser = (userInfo = null) => ({
    type: chatActionTypes.SET_OTHER_USER,
    payload: userInfo,
});
const setMessages = (messages = [], nextPageExists = true, newCount = 0) => ({
    type: chatActionTypes.SET_MESSAGES,
    payload: { data: messages, nextPageExists, newCount },
});
const setIsSending = (isSending = true) => ({
    type: chatActionTypes.SET_IS_SENDING,
    payload: isSending,
});

export const getDialogue = (otherUserId, pageIndex = 1, cb) => async (
    dispatch,
    getState
) => {
    if (!otherUserId) return;

    const {
        chat: {
            messages: { data: currentMessages, newCount },
        },
    } = getState();

    dispatch(setOtherUserId(otherUserId));
    const res = await chatsService.getDialogue(
        otherUserId,
        pageIndex,
        10,
        newCount
    );

    if (res && res.data) {
        const { id = null, otherUser = null, messages = [] } = res.data;

        dispatch(setChatId(id));
        dispatch(setOtherUser(otherUser));
        dispatch(
            setMessages(
                [...currentMessages, ...messages.data],
                messages.nextPageExists,
                newCount
            )
        );
    }

    cb?.();
};

export const sendMessage = (content, userId) => (dispatch) => {
    if (!userId || !content) return;

    dispatch(setIsSending(true));
    wsService.sendMessage(userId, content);
};

export const onReceiveMessage = (chat, newMessage) => (dispatch, getState) => {
    const {
        chat: {
            messages: { data: oldMessages, nextPageExists, newCount },
            otherUserId,
        },
    } = getState();

    if (newMessage.sender === otherUserId) {
        dispatch(
            setMessages(
                [...oldMessages, newMessage],
                nextPageExists,
                newCount + 1
            )
        );
    }
};

export const onMessageDelivered = (chat, newMessage) => (
    dispatch,
    getState
) => {
    const {
        chat: {
            messages: { data: oldMessages, nextPageExists, newCount },
            otherUserId,
        },
    } = getState();

    if (chat.members.find((member) => member._id === otherUserId)) {
        dispatch(
            setMessages(
                [...oldMessages, newMessage],
                nextPageExists,
                newCount + 1
            )
        );
        dispatch(setIsSending(false));
    }
};
