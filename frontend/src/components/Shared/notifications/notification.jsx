import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import concatClasses from "classnames";
import { push } from "connected-react-router";

import { store } from "../../../store";
import { notificationsActions } from "../../../store/actions";
import { wsService } from "../../../services/ws.service";
import { notificationTypes } from "../../../constants";

import ErrorSVG from "images/error.svg";
import TogglerSVG from "images/toggler.svg";
import DisconnectSVG from "images/disconnect.svg";
import TickSVG from "images/tick-in-circle.svg";
import DefaultAvatarIMG from "images/default-avatar.svg";

import classNames from "./notifications.module.scss";

const mapDispatchToProps = (dispatch) => ({
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
});

export const Notification = connect(
    null,
    mapDispatchToProps
)(
    ({
        id,
        type,
        title,
        text,
        details,
        dismissTimeout,
        showDetails = false,
        toggleDetails,
        notificationsActions,
    }) => {
        const [titleToRender, setTitleToRender] = useState(title);

        useEffect(() => {
            if (type === notificationTypes.connectionLost) {
                let secondsTillReconnect = 6;

                const titleAlterationInterval = setInterval(() => {
                    setTitleToRender((titleToRender) => {
                        secondsTillReconnect--;
                        return titleToRender === title
                            ? `Соединение через ${secondsTillReconnect}`
                            : title;
                    });
                }, 1000);

                const reconnectionTimeout = setTimeout(() => {
                    clearInterval(titleAlterationInterval);
                    notificationsActions.dismissNotification(id);
                    wsService
                        .connect()
                        .then(() => {
                            notificationsActions.notifySuccess(
                                "Соединение восстановлено",
                                "Соединение восстановлено"
                            );
                        })
                        .catch(() =>
                            notificationsActions.notifyError(
                                "Не удалось восстановить соединение",
                                "Не удалось восстановить соединение. Вам следует перезагрузить страницу."
                            )
                        );
                }, secondsTillReconnect * 1000);

                return () => {
                    clearTimeout(reconnectionTimeout);
                    clearInterval(titleAlterationInterval);
                };
            }
        }, []);

        const getIcon = () => {
            switch (type) {
                case notificationTypes.error:
                    return ErrorSVG;
                case notificationTypes.message:
                    return details?.avatar || DefaultAvatarIMG;
                case notificationTypes.connectionLost:
                    return DisconnectSVG;
                case notificationTypes.success:
                    return TickSVG;
                default:
                    return null;
            }
        };

        return (
            <div
                className={concatClasses(
                    classNames.notification,
                    classNames[type],
                    {
                        [classNames.open]: showDetails,
                    }
                )}
                onClick={() => {
                    type === notificationTypes.message &&
                        details?.id &&
                        store.dispatch(push(`/chat?userId=${details.id}`));

                    notificationsActions.dismissNotification(id);
                }}
            >
                <div className={classNames.title}>
                    <img src={getIcon()} />
                    <span>{titleToRender}</span>
                    <img
                        src={TogglerSVG}
                        style={
                            showDetails ? { transform: "rotate(180deg)" } : null
                        }
                        onClick={(event) => {
                            event.stopPropagation();
                            toggleDetails();
                        }}
                    />
                </div>
                <div className={classNames.details}>{text}</div>
            </div>
        );
    }
);
