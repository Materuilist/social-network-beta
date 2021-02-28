import React, { useState } from "react";
import { connect } from "react-redux";

import { Notification } from "./notification";
import {
    maxNotifications,
    notificationPlayerAudioId,
} from "../../../constants";

import NotificationSoundAndroid from "../../../static/sounds/notification.mp3";
import NotificationSoundIOS from "../../../static/sounds/notification.m4r";
import NotificationSoundUniversal from "../../../static/sounds/notification.ogg";

import classNames from "./notifications.module.scss";

const mapStateToProps = (state) => ({
    notifications: state.notifications,
});

export const Notifications = connect(mapStateToProps)(({ notifications }) => {
    const [detailedNotificationId, setDetailedNotificationId] = useState(null);

    return (
        <div className={classNames.notifications}>
            <audio hidden id={notificationPlayerAudioId}>
                <source src={NotificationSoundAndroid}></source>
                <source src={NotificationSoundIOS}></source>
                <source src={NotificationSoundUniversal}></source>
            </audio>
            {notifications.data
                .sort(
                    ({ id: timestampA }, { id: timestampB }) =>
                        timestampB - timestampA
                )
                .slice(0, maxNotifications)
                .map((item) => (
                    <Notification
                        key={item.id}
                        showDetails={detailedNotificationId === item.id}
                        toggleDetails={() =>
                            setDetailedNotificationId(
                                detailedNotificationId === item.id
                                    ? null
                                    : item.id
                            )
                        }
                        {...item}
                    />
                ))}
        </div>
    );
});
