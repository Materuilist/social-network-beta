import { chatListActionTypes, sharedActionTypes } from "../actionTypes";

const initialState = {
    isLoading: true,
    data: [],
};

export const chatListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case chatListActionTypes.SET_CHAT_LIST: {
            return { ...state, data: payload };
        }
        case chatListActionTypes.TOGGLE_LOADING: {
            return { ...state, isLoading: payload };
        }
        case sharedActionTypes.REINITIALIZE:
            return initialState;
        default:
            return state;
    }
};
