import { chatActionTypes, sharedActionTypes } from "../actionTypes";

const initialState = {
    otherUser: null,
    otherUserId: null, // для webscoket
    chatId: null,
    messages: {
        data: [],
        nextPageExists: true,
        newCount: 0,
    },
    isSending: false,
};

export const chatReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case chatActionTypes.SET_OTHER_USER_ID:
            return { ...state, otherUserId: payload };

        case chatActionTypes.SET_CHAT_ID:
            return { ...state, chatId: payload };

        case chatActionTypes.SET_OTHER_USER:
            return { ...state, otherUser: payload };

        case chatActionTypes.SET_MESSAGES:
            return { ...state, messages: { ...payload } };

        case chatActionTypes.SET_IS_SENDING: {
            return { ...state, isSending: payload };
        }

        case chatActionTypes.CLEAR:
        case sharedActionTypes.REINITIALIZE:
            return initialState;

        default:
            return state;
    }
};
