import {
    DISMISS_NOTIFICATION,
    SHOW_NOTIFICATION,
} from "../../actions/shared/notification.action.types";

const initialState = {
    items: null,
};

export const notificationReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case SHOW_NOTIFICATION: {
            return { ...state, items: [...(state.items || []), payload] };
        }
        case DISMISS_NOTIFICATION: {
            return {
                ...state,
                items: state.items.filter(
                    (notification) => notification.id !== payload
                ),
            };
        }
        default: {
            return state;
        }
    }
};
