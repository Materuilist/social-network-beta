import { sortDirections, sortTypes } from "../../constants";
import { friendsActionTypes } from "../actionTypes";

const initialState = {
    current: [],
    strangers: { data: [], isLoading: true, nextPageExists: true },
    filters: {
        currentFriends: {
            searchText: "",
            remember: false,
            sortBy: null,
            sortDirection: sortDirections.DECREASE,
            statuses: [],
            isOnline: false,
        },
        strangers: {
            searchText: "",
            remember: false,
            cities: [],
            interests: [],
            ageBottom: 0,
            ageTop: 140,
            anyAge: true,
            sex: null,
        },
    },
};

export const friendsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case friendsActionTypes.SET_FRIENDS: {
            return { ...state, current: payload };
        }
        case friendsActionTypes.SET_STRANGERS: {
            return {
                ...state,
                strangers: {
                    ...state.strangers,
                    data: payload.data,
                    nextPageExists: payload.nextPageExists,
                },
            };
        }

        case friendsActionTypes.TOGGLE_STRANGERS_LOADING: {
            return {
                ...state,
                strangers: { ...state.strangers, isLoading: payload },
            };
        }

        case friendsActionTypes.SET_FRIENDS_FILTER: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    currentFriends: { ...payload },
                },
            };
        }
        case friendsActionTypes.SET_STRANGERS_FILTER: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    strangers: { ...payload },
                },
            };
        }
        default:
            return state;
    }
};
