import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { userInfoReducer } from "./user-info/user-info.reducer";
import { notificationReducer } from "./Shared/notification.reducer";

const reducers = {
    userInfo: userInfoReducer,
    notifications: notificationReducer,
};

export const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        ...reducers,
    });
