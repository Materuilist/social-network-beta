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
