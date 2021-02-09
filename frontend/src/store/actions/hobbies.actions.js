import { UserInfoService } from "../../services/user-info.service";
import { hobbiesActionTypes } from "../actionTypes";

const userInfoService = new UserInfoService();

const setHobbies = (hobbies) => ({
    type: hobbiesActionTypes.SET_HOBBIES,
    payload: hobbies,
});

export const getOwnHobbies = (cb) => async (dispatch) => {
    const res = await userInfoService.getHobbies();
    console.log(res);
    cb && typeof cb === "function" && cb();
};
