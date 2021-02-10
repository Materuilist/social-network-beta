import { dictionariesActions } from ".";
import { UserInfoService } from "../../services/user-info.service";
import { hobbiesActionTypes } from "../actionTypes";

const userInfoService = new UserInfoService();

const setHobbies = (hobbies) => ({
    type: hobbiesActionTypes.SET_HOBBIES,
    payload: hobbies,
});

export const getOwnHobbies = (cb) => async (dispatch) => {
    const res = await userInfoService.getHobbies();
    if (res && res.interests) {
        dispatch(
            setHobbies(
                res.interests.map(({ _id, naming }) => ({
                    id: _id,
                    name: naming,
                }))
            )
        );
    }
    cb && typeof cb === "function" && cb();
};

export const addHobbies = (newHobbies = [], existingHobbies = [], cb) => async (
    dispatch
) => {
    const res = await userInfoService.addHobbies(newHobbies, existingHobbies);
    if (res) {
        dispatch(
            dictionariesActions.getAvailableInterests(() =>
                dispatch(getOwnHobbies(cb && typeof cb === "function" && cb()))
            )
        );
    } else {
        cb && typeof cb === "function" && cb();
    }
};
