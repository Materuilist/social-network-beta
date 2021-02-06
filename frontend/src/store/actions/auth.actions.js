import { userInfoActions } from ".";
import { tokenId } from "../../constants";
import { AuthService } from "../../services/auth.service";

const authService = new AuthService();

export const getUser = (cb) => async (dispatch, getState) => {
    const token = localStorage.getItem(tokenId);
    if (!token || token === "undefined") {
        localStorage.removeItem(tokenId);
        return cb && typeof cb === "function" && cb();
    }

    const user = await authService.getUser();

    if (user && user.userInfo) {
        dispatch(userInfoActions.setUserInfo(user.userInfo));
    } else {
        localStorage.removeItem(tokenId);
    }

    return cb && typeof cb === "function" && cb();
};

export const login = (login, password, cb) => async (dispatch, getState) => {
    const res = await authService.login(login, password);
    if (res && res.token) {
        localStorage.setItem(tokenId, res.token);
        dispatch(getUser());
    }
    cb && typeof cb === "function" && cb();
};

export const register = (login, password, cb) => async (dispatch, getState) => {
    const res = await authService.register(login, password);
    if (res && res.token) {
        localStorage.setItem(tokenId, res.token);
        dispatch(getUser());
    }
    cb && typeof cb === "function" && cb();
};

export const signOut = () => (dispatch) => {
    localStorage.removeItem(tokenId);
    dispatch(userInfoActions.clearUserInfo());
};
