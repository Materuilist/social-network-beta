import { hobbiesActionTypes } from "../actionTypes";

const initialState = {
    data: [],
};

export const hobbiesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case hobbiesActionTypes.SET_HOBBIES: {
            return { ...state, data: payload };
        }
        default:
            return state;
    }
};
