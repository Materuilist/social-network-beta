import { sortDirections, sortTypes } from "../../constants";
import { friendsActionTypes } from "../actionTypes";

const initialState = {
    current: [],
    strangers: [],
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
            city: null,
            interests: [],
            ageBottom: null,
            ageTop: null,
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
            return { ...state, strangers: payload };
        }

        case friendsActionTypes.SET_FRIENDS_FILTER: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    currentFriends: {
                        ...state.filters.currentFriends,
                        [payload.key]: payload.value,
                    },
                },
            };
        }
        case friendsActionTypes.SET_STRANGERS_FILTER: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    strangers: {
                        ...state.filters.strangers,
                        [payload.key]: payload.value,
                    },
                },
            };
        }
        default:
            return state;
    }
};
