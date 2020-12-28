import { notificationDuration, notificationTypes } from "../../../constants";

import {
    SHOW_NOTIFICATION,
    DISMISS_NOTIFICATION,
} from "./notification.action.types";

const showNotification = (content, headerText, type) => (
    dispatch,
    getState
) => {
    const {
        notifications: { items },
    } = getState();

    // порядковый номер уведомления
    const id =
        items && items.length !== 0
            ? items.reduce((max, item) => (item.id > max ? item.id : max), 1) +
              1
            : 1;
    console.log(items, id)

    // автоматическое удаление уведомления спустя некоторое время
    setTimeout(
        () => dispatch(dismissNotification(id)),
        notificationDuration * 1000
    );

    dispatch({
        type: SHOW_NOTIFICATION,
        payload: {
            id,
            content,
            headerText,
            type,
        },
    });
};

export const dismissNotification = (id = 1) => (dispatch) =>
    dispatch({
        payload: id,
        type: DISMISS_NOTIFICATION,
    });

export const showError = (content, headerText = "Ошибка!") => (dispatch) =>
    dispatch(showNotification(content, headerText, notificationTypes.error));

export const showWarning = (content, headerText = "Внимание!") => (dispatch) =>
    dispatch(showNotification(content, headerText, notificationTypes.warning));

export const showMessage = (content, headerText = "Сообщение!") => (dispatch) =>
    dispatch(showNotification(content, headerText, notificationTypes.message));

export const showSuccess = (content, headerText = "Отлично!") => (dispatch) =>
    dispatch(showNotification(content, headerText, notificationTypes.success));
