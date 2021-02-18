import { dictionariesActions } from ".";
import { FriendsService } from "../../services/friends.service";
import { friendsActionTypes } from "../actionTypes";

const friendsService = new FriendsService();

const setFriends = (friends = []) => ({
    type: friendsActionTypes.SET_FRIENDS,
    payload: friends,
});

export const setStrangers = (strangers = [], nextPageExists = true) => ({
    type: friendsActionTypes.SET_STRANGERS,
    payload: { data: strangers, nextPageExists },
});

const setRequests = (type = "incoming", requests = []) => ({
    type: friendsActionTypes.SET_REQUESTS,
    payload: { type, data: requests },
});

export const toggleStrangersLoading = (isLoading = true) => ({
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
            strangers,
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
        pageIndex,
        6
    );

    if (res && res.data) {
        dispatch(
            setStrangers(
                pageIndex === 1 ? res.data : [...strangers.data, ...res.data],
                res.nextPageExists || false
            )
        );
    }
    dispatch(toggleStrangersLoading(false));
};

export const changeStrangersFilter = (filter) => (dispatch, getState) => {
    const {
        friends: { filters },
        router: {
            location: { pathname },
        },
    } = getState();

    dispatch({
        type: friendsActionTypes.SET_STRANGERS_FILTER,
        payload: { ...filters.strangers, ...filter },
    });
    
    if (pathname.includes("friends/search")) {
        dispatch(setStrangers([])); //чтобы инфинит скролл сбросил страницу
        dispatch(getStrangers(1));
    }
};

export const changeStrangersSearchText = (searchText = "") => (
    dispatch,
    getState
) => {
    const {
        friends: { filters },
    } = getState();

    dispatch(setStrangers([])); //чтобы инфинит скролл сбросил страницу
    dispatch({
        type: friendsActionTypes.SET_STRANGERS_FILTER,
        payload: { ...filters.strangers, searchText },
    });
    dispatch(getStrangers(1));
};

export const toggleRequestsVisibility = (type = "incoming") => ({
    type: friendsActionTypes.TOGGLE_REQUESTS_VISIBILITY,
    payload: {
        type,
    },
});

export const getRequests = (cb) => async (dispatch) => {
    const res = await friendsService.getRequests();

    if (res) {
        res.incoming && dispatch(setRequests("incoming", res.incoming));
        res.outcoming && dispatch(setRequests("outcoming", res.outcoming));
    }

    cb && typeof cb === "function" && cb();
};

export const addFriend = (userId, cb) => async (dispatch, getState) => {
    if (!userId) return cb && typeof cb === "function" && cb();

    await friendsService.addFriend(userId);
    cb && typeof cb === "function" && cb();
};
