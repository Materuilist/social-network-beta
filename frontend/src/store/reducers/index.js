import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { userInfoReducer } from "./user-info/user-info.reducer";

import { notificationReducer } from "./Shared/notification.reducer";
import { dictionariesReducer } from "./Shared/dictionaries.reducer";

const reducers = {
    notifications: notificationReducer,
    dictionaries: dictionariesReducer,

    userInfo: userInfoReducer,
};

export const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        ...reducers,
    });
