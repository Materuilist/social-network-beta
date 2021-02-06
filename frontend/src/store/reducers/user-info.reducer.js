import { userInfoActionTypes } from "../actionTypes";

const initialState = {
    login: null,
    avatar: null,
    sex: null,
    city: null,
    birthDate: null,
};

export const userInfoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case userInfoActionTypes.SET_USER_INFO:
            return { ...state, ...payload };
        case userInfoActionTypes.CLEAR_USER_INFO: {
            return initialState;
        }
        default:
            return state;
    }
};
