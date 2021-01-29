import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { userInfoReducer } from "./user-info.reducer";
import { notificationsReducer } from "./notifications.reducer";

const reducers = {
    notifications: notificationsReducer,

    userInfo: userInfoReducer,
};

export const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        ...reducers,
    });
