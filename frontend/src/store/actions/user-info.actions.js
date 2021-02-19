import { userInfoActionTypes } from "../actionTypes";
import { UserInfoService } from "../../services/user-info.service";
import { tokenId } from "../../constants";
import { sharedActions } from ".";

const userInfoService = new UserInfoService();

export const setUserInfo = (userInfo) => ({
    type: userInfoActionTypes.SET_USER_INFO,
    payload: userInfo,
});

export const getInfo = (cb) => async (dispatch, getState) => {
    const info = await userInfoService.getInfo();

    if (info) {
        dispatch(setUserInfo(info));
    } else {
        localStorage.removeItem(tokenId);
        dispatch(sharedActions.reinitialize());
    }

    cb && typeof cb === "function" && cb();
};

export const updateAvatar = (avatarBinary, cb) => async (dispatch) => {
    const res = await userInfoService.updateAvatar(avatarBinary);
    if (res) {
        dispatch(setUserInfo({ avatar: avatarBinary }));
    }
    cb && typeof cb === "function" && cb();
};

export const updateInfo = (data, cb) => async (dispatch) => {
    const res = await userInfoService.updateInfo(data);
    if (res) {
        dispatch(setUserInfo({ ...data }));
    }
    cb && typeof cb === "function" && cb();
};
