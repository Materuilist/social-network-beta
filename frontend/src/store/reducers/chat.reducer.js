import { chatActionTypes, sharedActionTypes } from "../actionTypes";

const initialState = {
    otherUser: null,
    chatId: null,
    messages: {
        data: [],
        nextPageExists: true,
    },
};

export const chatReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case chatActionTypes.SET_CHAT_ID:
            return { ...state, chatId: payload };

        case chatActionTypes.SET_OTHER_USER:
            return { ...state, otherUser: payload };

        case chatActionTypes.SET_MESSAGES:
            return { ...state, messages: { ...payload } };

        case chatActionTypes.CLEAR:
        case sharedActionTypes.REINITIALIZE:
            return initialState;

        default:
            return state;
    }
};
