import { dictionariesActions } from ".";
import { FriendsService } from "../../services/friends.service";
import { friendsActionTypes } from "../actionTypes";

const friendsService = new FriendsService();

const setFriends = (friends = []) => ({
    type: friendsActionTypes.SET_FRIENDS,
    payload: friends,
});

const setStrangers = (strangers = []) => ({
    type: friendsActionTypes.SET_STRANGERS,
    payload: strangers,
});

export const getFriends = (cb) => async (dispatch) => {
    const res = await friendsService.getCurrentFriends();
    if (res && res.friends) {
        dispatch(setFriends(res.friends));
        dispatch(dictionariesActions.getFriendsStatuses(cb));
    } else {
        cb && typeof cb === "function" && cb();
    }
};

export const getStrangers = (pageIndex = 1, cb) => async (
    dispatch,
    getState
) => {
    const {
        friends: {
            filters: {
                strangers: {
                    searchText,
                    remember,
                    city,
                    interests,
                    ageBottom,
                    ageTop,
                    sex,
                },
            },
        },
    } = getState();

    const res = await friendsService.getStrangers(
        searchText,
        {
            city,
            interests: interests && interests.length ? interests : null,
            ageBottom,
            ageTop,
            sex,
        },
        pageIndex
    );

    if (res && res.data) {
        dispatch(setStrangers(res.data));
    }
    cb && typeof cb === "function" && cb();
};
