import { ChatsService } from "../../services/chats.service";
import { chatListActionTypes } from "../actionTypes";

const chatsService = new ChatsService();

const setChats = (chats = []) => ({
    type: chatListActionTypes.SET_CHAT_LIST,
    payload: chats,
});

const toggleLoading = (isLoading = true) => ({
    type: chatListActionTypes.TOGGLE_LOADING,
    payload: isLoading,
});

export const getChats = (cb, showLoader = true) => async (dispatch) => {
    showLoader && dispatch(toggleLoading(true));
    const res = await chatsService.getChats();
    if (res && res.chats) {
        dispatch(setChats(res.chats));
        showLoader && dispatch(toggleLoading(false));
    }
    cb?.();
};
