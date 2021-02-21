import { LikesService } from "../../../services/likes.service";
import { UserInfoService } from "../../../services/user-info.service";
import { otherUserProfileModalActionTypes } from "../../actionTypes";

const userInfoService = new UserInfoService();
const likesService = new LikesService();

const toggleVisibility = (show = true) => ({
    type: otherUserProfileModalActionTypes.SET_VISIBILITY,
    payload: show,
});

const setUserId = (userId) => ({
    type: otherUserProfileModalActionTypes.SET_USER_ID,
    payload: userId,
});

const clean = () => ({ type: otherUserProfileModalActionTypes.CLEAN });

export const open = (userId) => async (dispatch, getState) => {
    if (!userId) return;

    dispatch(toggleVisibility(true));
    dispatch(setUserId(userId));
};

export const close = () => (dispatch) => {
    dispatch(clean());
};

export const getInfo = (cb) => async (dispatch, getState) => {
    const {
        otherUserProfileModal: { userId },
    } = getState();

    if (userId) {
        const info = await userInfoService.getInfo(userId);

        if (info) {
            dispatch({
                type: otherUserProfileModalActionTypes.SET_INFO,
                payload: info,
            });
        }
    }

    return cb && typeof cb === "function" && cb();
};

export const getPhotos = (cb) => async (dispatch, getState) => {
    const {
        otherUserProfileModal: { userId },
    } = getState();

    if (userId) {
        const res = await userInfoService.getPhotos(userId);

        if (res && res.photos) {
            dispatch({
                type: otherUserProfileModalActionTypes.SET_PHOTOS,
                payload: res.photos,
            });
        }
    }

    return cb && typeof cb === "function" && cb();
};

export const getInterests = (cb) => async (dispatch, getState) => {
    const {
        otherUserProfileModal: { userId },
    } = getState();

    if (userId) {
        const res = await userInfoService.getHobbies(userId);

        if (res && res.interests) {
            dispatch({
                type: otherUserProfileModalActionTypes.SET_HOBBIES,
                payload: res.interests,
            });
        }
    }

    return cb && typeof cb === "function" && cb();
};

export const togglePhotosLikes = (userId, photosIds) => async (dispatch) => {
    if (!userId || !photosIds || !photosIds.length) return;

    await likesService.togglePhotosLikes(userId, photosIds);
};
