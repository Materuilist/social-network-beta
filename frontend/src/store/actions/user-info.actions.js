import { userInfoActionTypes } from "../actionTypes";
import { UserInfoService } from '../../services/user-info.service';
import { tokenId } from "../../constants";

const userInfoService = new UserInfoService();

export const setUserInfo = (userInfo) => ({
    type: userInfoActionTypes.SET_USER_INFO,
    payload: userInfo,
});

export const clearUserInfo = () => ({
    type: userInfoActionTypes.CLEAR_USER_INFO,
});

export const getInfo = (cb) => async(dispatch, getState) => {
    const info = await userInfoService.getInfo();

    if(info){
        dispatch(setUserInfo(info));
    }else{
        localStorage.removeItem(tokenId)
        dispatch(clearUserInfo());
    }

    cb && typeof(cb) === 'function' && cb();
};
