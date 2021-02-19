import { hobbiesActionTypes, sharedActionTypes } from "../actionTypes";

const initialState = {
    data: [],
};

export const hobbiesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case hobbiesActionTypes.SET_HOBBIES: {
            return { ...state, data: payload };
        }
        case sharedActionTypes.REINITIALIZE: {
            return initialState;
        }
        default:
            return state;
    }
};
