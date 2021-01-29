import { userInfoActionTypes } from "../actionTypes";

const initialState = {
    login: null,
    sex: null,
    city: null,
    birthDate: null,
};

export const userInfoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case userInfoActionTypes.SET_USER_INFO:
            return { ...state, ...payload };
        default:
            return state;
    }
};
