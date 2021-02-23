import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { userInfoReducer } from "./user-info.reducer";
import { hobbiesReducer } from "./hobbies.reducer";
import { photosReducer } from "./photos.reducer";

import { notificationsReducer } from "./notifications.reducer";
import { dictionariesReducer } from "./dictionaries.reducer";

import { friendsReducer } from "./friends.reducer";

import { chatsReducer } from "./chats.reducer";

import { otherUserProfileModalReducer } from "./shared/other-user-profile-modal.reducer";

const reducers = {
    dictionaries: dictionariesReducer,
    notifications: notificationsReducer,

    userInfo: userInfoReducer,
    hobbies: hobbiesReducer,
    photos: photosReducer,

    friends: friendsReducer,

    chats: chatsReducer,

    otherUserProfileModal: otherUserProfileModalReducer,
};

export const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        ...reducers,
    });
