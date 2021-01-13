import { push } from "connected-react-router";
import { notificationActions } from "..";

import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";
import { SET_USER_INFO } from "./user.info.action.types";

const authService = new AuthService();
const userService = new UserService();

export const setUserInfo = (userInfo) => ({
    type: SET_USER_INFO,
    payload: userInfo,
});

export const getUser = (callback) => async (dispatch, getState) => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
        dispatch(push("/auth"));
    } else {
        const res = await authService.getUser(jwt);
        if (res.ok) {
            const { userInfo } = await res.json();
            dispatch(setUserInfo(userInfo));
        } else {
            localStorage.removeItem("jwt");
            dispatch(push("/auth"));
        }
    }
    typeof callback === "function" && callback();
};

export const register = (login, password) => async (dispatch, getState) => {
    const res = await authService.register(login, password);
    const { token, message } = await res.json();

    if (res.ok && token) {
        localStorage.setItem("jwt", token);
        await getUser()(dispatch);
        dispatch(push("/profile"));
    } else {
        dispatch(notificationActions.showError(message));
    }
};

export const login = (login, password) => async (dispatch, getState) => {
    const res = await authService.login(login, password);
    const { token, message } = await res.json();

    if (res.ok && token) {
        localStorage.setItem("jwt", token);
        await getUser()(dispatch);
        dispatch(push("/profile"));
    } else {
        dispatch(notificationActions.showError(message));
    }
};

export const getUserInfo = (userId, callback) => async (dispatch, getState) => {
    const res = await userService.getInfo(userId);
    const userInfo = await res.json();
    dispatch(setUserInfo(userInfo));
    typeof callback === "function" && callback();
};

export const saveUserInfo = (callback) => async (dispatch, getState) => {
    const { userInfo } = getState();
    await userService.updateInfo(userInfo);
    dispatch(getUserInfo(null, callback));
};
