import { chatsActionTypes, sharedActionTypes } from "../actionTypes";

const initialState = {
    isLoading: true,
    data: [],
};

export const chatsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case chatsActionTypes.SET_CHATS: {
            return { ...state, data: payload };
        }
        case chatsActionTypes.TOGGLE_LOADING: {
            return { ...state, isLoading: payload };
        }
        case sharedActionTypes.REINITIALIZE:
            return initialState;
        default:
            return state;
    }
};
