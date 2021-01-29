import React, { useState } from "react";
import { connect } from "react-redux";

import { Notification } from "./notification";
import { maxNotifications } from "../../../constants";

import classNames from "./notifications.module.scss";

const mapStateToProps = (state) => ({
    notifications: state.notifications,
});

export const Notifications = connect(mapStateToProps)(({ notifications }) => {
    const [detailedNotificationId, setDetailedNotificationId] = useState(null);

    return (
        <div className={classNames.notifications}>
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
