import { sharedActions, userInfoActions } from ".";
import { tokenId } from "../../constants";
import { AuthService } from "../../services/auth.service";
import { wsService } from "../../services/ws.service";

const authService = new AuthService();

export const login = (login, password, cb) => async (dispatch, getState) => {
    const res = await authService.login(login, password);
    if (res && res.token) {
        localStorage.setItem(tokenId, res.token);
        wsService.connect().then(
            () => {
                dispatch(userInfoActions.getInfo(cb));
            },
            () => cb?.()
        );
    } else {
        cb?.();
    }
};

export const register = (login, password, cb) => async (dispatch, getState) => {
    const res = await authService.register(login, password);
    if (res && res.token) {
        localStorage.setItem(tokenId, res.token);
        wsService.connect().then(
            () => {
                dispatch(userInfoActions.getInfo(cb));
            },
            () => cb?.()
        );
    } else {
        cb && typeof cb === "function" && cb();
    }
};

export const signOut = () => (dispatch) => {
    localStorage.removeItem(tokenId);
    wsService.disconnect();
    dispatch(sharedActions.reinitialize());
};
