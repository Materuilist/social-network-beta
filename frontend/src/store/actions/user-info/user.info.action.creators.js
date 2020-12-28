import { push } from "connected-react-router";
import { notificationActions } from "..";

import { AuthService } from "../../../services/auth.service";
import { SET_USER_INFO } from "./user.info.action.types";

const authService = new AuthService();

export const setUserInfo = (userInfo) => ({
    type: SET_USER_INFO,
    payload: userInfo,
});

export const getUser = () => async (dispatch, getState) => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
        return dispatch(push("/"));
    } else {
        const res = await authService.getUser(jwt);
        if (res.ok) {
            const { userInfo } = await res.json();
            return dispatch(setUserInfo(userInfo));
        } else {
            localStorage.removeItem("jwt");
            return dispatch(push("/"));
        }
    }
};

export const register = (login, password) => async (dispatch, getState) => {
    const res = await authService.register(login, password);
    const { token, message } = await res.json();

    if (res.ok && token) {
        localStorage.setItem("jwt", token);
        await getUser()(dispatch);
        dispatch(push("/"));
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
