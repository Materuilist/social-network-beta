import InfoIconIMG from "images/info-icon.svg";
import InfoIconActiveIMG from "images/info-icon-active.svg";
import CameraIMG from "images/camera.svg";
import CameraActiveIMG from "images/camera-active.svg";
import HobbiesIMG from "images/hobbies.svg";
import HobbiesActiveIMG from "images/hobbies-active.svg";

export const BASE_FONT_SIZE = 16;

export const tokenId = "sn_jwt";

export const notificationTypes = {
    warning: "warning",
    error: "error",
    success: "success",
    message: "message",
};
export const notificationDismissDelay = 200000;
export const maxNotifications = 3;

export const sortTypes = {
    friends: [
        { id: "IMPORTANCE", name: "По важности" },
        { id: "AGE", name: "По возрасту" },
    ],
};

export const otherUserTypes = {
    STRANGER: "STRANGER",
    INCOMING_REQUEST: "INCOMING_REQUEST",
    OUTCOMING_REQUEST: "OUTCOMING_REQUEST",
    FRIEND: "FRIENDS",
};
export const otherUserProfileModalTabs = {
    PROFILE: {
        name: "Профиль",
        icon: InfoIconIMG,
        iconActive: InfoIconActiveIMG,
    },
    PHOTOS: {
        name: "Фото",
        icon: CameraIMG,
        iconActive: CameraActiveIMG,
    },
    HOBBIES: {
        name: "Интересы",
        icon: HobbiesIMG,
        iconActive: HobbiesActiveIMG,
    },
};
