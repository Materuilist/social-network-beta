import { dictionariesActionTypes } from "../actionTypes";

const initialState = {
    cities: [],
};

export const dictionariesReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case dictionariesActionTypes.SET_CITIES: {
            return { ...state, cities: payload };
        }
        default:
            return state;
    }
};
