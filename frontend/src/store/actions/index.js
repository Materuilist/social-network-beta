import { sharedActionTypes } from "../actionTypes";

export * as userInfoActions from "./user-info.actions";
export * as hobbiesActions from "./hobbies.actions";
export * as photosActions from "./photos.actions";

export * as friendsActions from "./friends.actions";

export * as chatListActions from "./chat-list.actions";
export * as chatActions from "./chat.actions";

export * as authActions from "./auth.actions";

export * as dictionariesActions from "./dictionaries.actions";
export * as notificationsActions from "./notifications.actions";
export * as onlineDataActions from "./shared/online-data.actions";

export * as otherUserProfileModalActions from "./shared/other-user-profile-modal.actions";

export const sharedActions = {
    reinitialize: () => ({
        type: sharedActionTypes.REINITIALIZE,
    }),
};
