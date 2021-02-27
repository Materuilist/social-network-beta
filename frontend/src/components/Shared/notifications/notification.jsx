import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import concatClasses from "classnames";

import { notificationsActions } from "../../../store/actions";
import { notificationTypes } from "../../../constants";

import ErrorSVG from "images/error.svg";
import TogglerSVG from "images/toggler.svg";
import DefaultAvatarIMG from "images/default-avatar.svg";

import classNames from "./notifications.module.scss";
import { store } from "../../../store";
import { push } from "connected-react-router";

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
        const getIcon = () => {
            switch (type) {
                case notificationTypes.error:
                    return ErrorSVG;
                case notificationTypes.message:
                    return details?.avatar || DefaultAvatarIMG;
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
                    <span>{title}</span>
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
