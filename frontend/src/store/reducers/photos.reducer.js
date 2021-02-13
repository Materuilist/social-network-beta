import { photosActionTypes } from "../actionTypes";

const initialState = {
    data: [],
};

export const photosReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case photosActionTypes.SET_PHOTOS: {
            return { ...state, data: payload };
        }
        default:
            return state;
    }
};
