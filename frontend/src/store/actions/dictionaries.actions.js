import { DictionariesService } from "../../services/dictionaries.service";
import { dictionariesActionTypes } from "../actionTypes";

const dictionariesService = new DictionariesService();

export const getCities = (cb) => async (dispatch, getState) => {
    const {
        dictionaries: { cities },
    } = getState();

    if (cities.length === 0) {
        const res = await dictionariesService.getCities();
        if (res && res.data) {
            dispatch({
                type: dictionariesActionTypes.SET_CITIES,
                payload: res.data,
            });
        }
    }

    cb && typeof cb === "function" && cb();
};

export const getAvailableInterests = (cb) => async (dispatch) => {
    const res = await dictionariesService.getAvailableInterests();
    if (res && res.data) {
        dispatch({
            type: dictionariesActionTypes.SET_INTERESTS,
            payload: res.data.map(({ _id, naming }) => ({
                id: _id,
                name: naming,
            })),
        });
    }
    cb && typeof cb === "function" && cb();
};

export const getFriendsStatuses = (cb) => async (dispatch, getState) => {
    const {
        dictionaries: { friendsStatuses },
    } = getState();

    if (friendsStatuses.length === 0) {
        const res = await dictionariesService.getFriendsStatuses();
        if (res && res.data) {
            dispatch({
                type: dictionariesActionTypes.SET_FRIENDS_STATUSES,
                payload: res.data,
            });
        }
    }

    cb && typeof cb === "function" && cb();
};
