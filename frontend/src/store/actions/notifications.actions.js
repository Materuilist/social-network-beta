import { notificationsActionTypes } from "../actionTypes";
import { notificationDismissDelay, notificationTypes } from "../../constants";

const setNotifications = (notifications = []) => ({
    type: notificationsActionTypes.SET_NOTIFICATIONS,
    payload: notifications,
});

const notify = (
    type = notificationTypes.warning,
    title = "Внимание!",
    text,
    details
) => (dispatch, getState) => {
    const { notifications } = getState();

    const id = Date.now();
    const dismissTimeout = setTimeout(() => {
        dispatch(dismissNotification(id));
    }, notificationDismissDelay);

    dispatch(
        setNotifications([
            ...notifications.data,
            {
                id,
                type,
                title,
                text,
                dismissTimeout,
                details,
            },
        ])
    );
};

export const dismissNotification = (notificationId) => (dispatch, getState) => {
    const { notifications } = getState();

    dispatch(
        setNotifications(
            notifications.data.filter(({ id }) => id !== notificationId)
        )
    );
};

export const notifyError = (title, text) => (dispatch) => {
    dispatch(notify(notificationTypes.error, title || "Ошибка!", text));
};
export const notifyWarning = (title, text) => (dispatch) => {
    dispatch(notify(notificationTypes.warning, title || "Внимание!", text));
};
export const notifySuccess = (title, text) => (dispatch) => {
    dispatch(notify(notificationTypes.success, title || "Отлично!", text));
};
export const notifyMessage = (title, text, details) => (dispatch) => {
    dispatch(
        notify(notificationTypes.message, title || "Сообщение!", text, details)
    );
};
export const notifyConnectionLost = (title, text) => (dispatch) => {
    dispatch(
        notify(
            notificationTypes.connectionLost,
            title || "Внимание! Соединение разорвано",
            text
        )
    );
};
