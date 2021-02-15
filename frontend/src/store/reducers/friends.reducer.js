import { sortDirections, sortTypes } from "../../constants";
import { friendsActionTypes } from "../actionTypes";

const initialState = {
    current: [],
    filters: {
        currentFriends: {
            remember: false,
            sortBy: null,
            sortDirection: sortDirections.DECREASE,
            statuses: [],
            isOnline: false,
        },
    },
};

export const friendsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case friendsActionTypes.SET_FRIENDS: {
            return { ...state, current: payload };
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
        default:
            return state;
    }
};
