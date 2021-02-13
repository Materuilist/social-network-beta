import { UserInfoService } from "../../services/user-info.service";
import { photosActionTypes } from "../actionTypes";

const userInfoService = new UserInfoService();

const setPhotos = (photos = []) => ({
    type: photosActionTypes.SET_PHOTOS,
    payload: photos,
});

export const getPhotos = (cb) => async (dispatch) => {
    const res = await userInfoService.getPhotos();
    res && res.photos && dispatch(setPhotos(res.photos));
    cb && typeof cb === "function" && cb();
};
