import { userInfoActionTypes } from "../actionTypes";

export const setUserInfo = (userInfo) => ({
    type: userInfoActionTypes.SET_USER_INFO,
    payload: userInfo,
});

export const clearUserInfo = () => ({
    type: userInfoActionTypes.CLEAR_USER_INFO,
});
