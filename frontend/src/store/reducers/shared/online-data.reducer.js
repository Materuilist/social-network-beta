import { onlineDataActionTypes, sharedActionTypes } from "../../actionTypes";

// данные, полученные от ws (не все)
const initialState = {
    onlineStatuses: [], //[{userId, isOnline}]
};

export const onlineDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case onlineDataActionTypes.SET_ONLINE_STATUSES:
            return { ...state, onlineStatuses: payload };

        case sharedActionTypes.REINITIALIZE:
            return initialState;
        default:
            return state;
    }
};
