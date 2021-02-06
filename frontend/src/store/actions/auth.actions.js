import { userInfoActions } from ".";
import { tokenId } from "../../constants";
import { AuthService } from "../../services/auth.service";

const authService = new AuthService();

export const login = (login, password, cb) => async (dispatch, getState) => {
    const res = await authService.login(login, password);
    if (res && res.token) {
        localStorage.setItem(tokenId, res.token);
        dispatch(userInfoActions.getInfo());
    }
    cb && typeof cb === "function" && cb();
};

export const register = (login, password, cb) => async (dispatch, getState) => {
    const res = await authService.register(login, password);
    if (res && res.token) {
        localStorage.setItem(tokenId, res.token);
        dispatch(userInfoActions.getInfo());
    }
    cb && typeof cb === "function" && cb();
};

export const signOut = () => (dispatch) => {
    localStorage.removeItem(tokenId);
    dispatch(userInfoActions.clearUserInfo());
};
