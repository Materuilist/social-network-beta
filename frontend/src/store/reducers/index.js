import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { userInfoReducer } from "./user-info.reducer";
import { notificationsReducer } from "./notifications.reducer";
import { dictionariesReducer } from "./dictionaries.reducer";

const reducers = {
    dictionaries: dictionariesReducer,
    notifications: notificationsReducer,

    userInfo: userInfoReducer,
};

export const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        ...reducers,
    });
