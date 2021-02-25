import { chatActionTypes, sharedActionTypes } from "../actionTypes";

const initialState = {
    members: [],
    chatId: null,
    messages: [],
};

export const chatReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case chatActionTypes.SET_CHAT_ID:
            return { ...state, chatId: payload };

        case chatActionTypes.SET_MEMBERS:
            return { ...state, members: [...payload] };

        case chatActionTypes.SET_MESSAGES:
            return { ...state, messages: [...payload] };

        case sharedActionTypes.REINITIALIZE:
            return initialState;

        default:
            return state;
    }
};
