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

const toggleStrangersLoading = (isLoading = true) => ({
    type: friendsActionTypes.TOGGLE_STRANGERS_LOADING,
    payload: isLoading,
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

export const getStrangers = (pageIndex = 1) => async (dispatch, getState) => {
    const {
        friends: {
            filters: {
                strangers: {
                    searchText,
                    remember,
                    cities,
                    interests,
                    ageBottom,
                    ageTop,
                    sex,
                    anyAge,
                },
            },
        },
    } = getState();

    dispatch(toggleStrangersLoading(true));
    const res = await friendsService.getStrangers(
        searchText,
        {
            cities: cities && cities.length ? cities : null,
            interests: interests && interests.length ? interests : null,
            ageBottom: anyAge ? null : ageBottom,
            ageTop: anyAge ? null : ageTop,
            sex,
        },
        pageIndex
    );

    if (res && res.data) {
        dispatch(setStrangers(res.data));
    }
    dispatch(toggleStrangersLoading(false));
};

export const changeStrangersFilter = (filter) => (dispatch, getState) => {
    const {
        friends: { filters },
    } = getState();

    dispatch({
        type: friendsActionTypes.SET_STRANGERS_FILTER,
        payload: { ...filters.strangers, ...filter },
    });
    dispatch(getStrangers(1));
};

export const changeStrangersSearchText = (searchText = "") => (
    dispatch,
    getState
) => {
    const {
        friends: { filters },
    } = getState();

    dispatch({
        type: friendsActionTypes.SET_STRANGERS_FILTER,
        payload: { ...filters.strangers, searchText },
    });
    dispatch(getStrangers(1));
};
