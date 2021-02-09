import { dictionariesActionTypes } from "../actionTypes";

const initialState = {
    cities: [],
    interests: [],
};

export const dictionariesReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case dictionariesActionTypes.SET_CITIES: {
            return { ...state, cities: payload };
        }
        case dictionariesActionTypes.SET_INTERESTS: {
            return { ...state, interests: payload };
        }
        default:
            return state;
    }
};
