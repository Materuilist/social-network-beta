import { notificationsActionTypes, sharedActionTypes } from "../actionTypes";

const initialState = {
    data: [], //{id, type, title, text, dismissTimeout} - id - timestamp
};

export const notificationsReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case notificationsActionTypes.SET_NOTIFICATIONS:
            return { ...state, data: payload };
        case sharedActionTypes.REINITIALIZE: {
            return initialState;
        }
        default:
            return state;
    }
};
