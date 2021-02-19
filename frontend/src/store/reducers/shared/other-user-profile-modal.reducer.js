import {
    otherUserProfileModalActionTypes,
    sharedActionTypes,
} from "../../actionTypes";

const initialState = {
    show: false,
    userId: null,
    info: {
        login: null,
        avatar: null,
        statuses: [],
        isFriend: false,
        sex: null,
        birthDate: null,
        city: null,
    },
    photos: [],
    hobbies: [],
};

export const otherUserProfileModalReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case otherUserProfileModalActionTypes.SET_VISIBILITY: {
            return { ...state, show: payload };
        }
        case otherUserProfileModalActionTypes.SET_USER_ID: {
            return { ...state, userId: payload };
        }
        case otherUserProfileModalActionTypes.SET_INFO: {
            return { ...state, info: payload };
        }
        case otherUserProfileModalActionTypes.SET_PHOTOS: {
            return { ...state, photos: payload };
        }
        case otherUserProfileModalActionTypes.SET_HOBBIES: {
            return { ...state, hobbies: payload };
        }
        case otherUserProfileModalActionTypes.CLEAN: {
            return initialState;
        }
        case sharedActionTypes.REINITIALIZE: {
            return initialState;
        }
        default:
            return state;
    }
};
