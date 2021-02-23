import { ChatsService } from "../../services/chats.service";
import { chatsActionTypes } from "../actionTypes";

const chatsService = new ChatsService();

const setChats = (chats = []) => ({
    type: chatsActionTypes.SET_CHATS,
    payload: chats,
});

const toggleLoading = (isLoading = true) => ({
    type: chatsActionTypes.TOGGLE_LOADING,
    payload: isLoading,
});

export const getChats = () => async (dispatch) => {
    dispatch(toggleLoading(true));
    const res = await chatsService.getChats();
    if (res && res.chats) {
        dispatch(setChats(res.chats));
        dispatch(toggleLoading(false));
    }
};
