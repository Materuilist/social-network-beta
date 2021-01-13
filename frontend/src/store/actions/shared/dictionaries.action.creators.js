import { DictionariesService } from "../../../services/dictionaries.service";

const dictionariesService = new DictionariesService();

export const setDictionary = (name, items) => ({
    type: "SET_DICTIONARY",
    payload: {
        dictionary: name,
        items,
    },
});

export const getCities = (pageId, itemsCount, all = true, cb) => async (
    dispatch
) => {
    const res = await dictionariesService.getCities(pageId, itemsCount, all);
    const cities = await res.json();
    dispatch(setDictionary("cities", cities));
    cb && typeof cb === "function" && cb();
};
