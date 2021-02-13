import { UserInfoService } from "../../services/user-info.service";
import { photosActionTypes } from "../actionTypes";

const userInfoService = new UserInfoService();

const setPhotos = (photos = []) => ({
    type: photosActionTypes.SET_PHOTOS,
    payload: photos,
});

export const getPhotos = (cb) => async (dispatch) => {
    const res = await userInfoService.getPhotos();
    res &&
        res.photos &&
        dispatch(
            setPhotos(
                res.photos.map(({ _id, data, likesCount }) => ({
                    id: _id,
                    data,
                    likesCount,
                }))
            )
        );
    cb && typeof cb === "function" && cb();
};

export const addPhotos = (photos = [], cb) => async (dispatch) => {
    const res = await userInfoService.addPhotos(photos);
    dispatch(getPhotos(cb));
};
