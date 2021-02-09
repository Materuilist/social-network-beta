import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { userInfoReducer } from "./user-info.reducer";
import { notificationsReducer } from "./notifications.reducer";
import { dictionariesReducer } from "./dictionaries.reducer";
import { hobbiesReducer } from "./hobbies.reducer";

const reducers = {
    dictionaries: dictionariesReducer,
    notifications: notificationsReducer,

    userInfo: userInfoReducer,
    hobbies: hobbiesReducer,
};

export const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        ...reducers,
    });
