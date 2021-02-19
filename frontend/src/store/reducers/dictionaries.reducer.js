import { dictionariesActionTypes, sharedActionTypes } from "../actionTypes";

const initialState = {
    cities: [],
    interests: [],
    friendsStatuses: [],
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
        case dictionariesActionTypes.SET_FRIENDS_STATUSES: {
            return { ...state, friendsStatuses: payload };
        }
        case sharedActionTypes.REINITIALIZE: {
            return initialState;
        }
        default:
            return state;
    }
};
