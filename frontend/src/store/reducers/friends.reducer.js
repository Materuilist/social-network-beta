import { friendsActionTypes, sharedActionTypes } from "../actionTypes";

const initialState = {
    current: [],
    strangers: { data: [], isLoading: true, nextPageExists: true },
    requests: {
        incoming: { data: [], isVisible: true },
        outcoming: { data: [], isVisible: true },
    },
    filters: {
        currentFriends: {
            searchText: "",
            remember: false,
            sortBy: null,
            sortUp: false,
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
                    strangers: { ...payload },
                },
            };
        }

        case friendsActionTypes.SET_REQUESTS: {
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [payload.type]: {
                        ...state.requests[payload.type],
                        data: payload.data,
                    },
                },
            };
        }
        case friendsActionTypes.TOGGLE_REQUESTS_VISIBILITY: {
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [payload.type]: {
                        ...state.requests[payload.type],
                        isVisible: !state.requests[payload.type].isVisible,
                    },
                },
            };
        }

        case sharedActionTypes.REINITIALIZE: {
            return initialState;
        }
        default:
            return state;
    }
};
