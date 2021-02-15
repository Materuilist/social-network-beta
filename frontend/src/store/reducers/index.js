import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { userInfoReducer } from "./user-info.reducer";
import { hobbiesReducer } from "./hobbies.reducer";
import { photosReducer } from "./photos.reducer";

import { notificationsReducer } from "./notifications.reducer";
import { dictionariesReducer } from "./dictionaries.reducer";

import { friendsReducer } from "./friends.reducer";

const reducers = {
    dictionaries: dictionariesReducer,
    notifications: notificationsReducer,

    userInfo: userInfoReducer,
    hobbies: hobbiesReducer,
    photos: photosReducer,

    friends: friendsReducer,
};

export const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        ...reducers,
    });
