import { photosActionTypes, sharedActionTypes } from "../actionTypes";

const initialState = {
    data: [],
};

export const photosReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case photosActionTypes.SET_PHOTOS: {
            return { ...state, data: payload };
        }
        case sharedActionTypes.REINITIALIZE: {
            return initialState;
        }
        default:
            return state;
    }
};
