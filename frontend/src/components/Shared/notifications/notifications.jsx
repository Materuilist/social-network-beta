import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Notification from "./notification";
import { notificationActions } from "../../../store/actions";

import classNames from "./notifications.module.scss";
import { simultaneouslyDisplayedNotificationsCount } from "../../../constants";

const Notifications = ({ notifications, notificationActions }) => {
    return (
        <>
            {notifications && notifications.length !== 0 && (
                <div className={classNames.notifications}>
                    {notifications
                        // сначала показываем более поздние уведомления
                        .sort((a, b) => b.id - a.id)
                        .slice(0, simultaneouslyDisplayedNotificationsCount)
                        .map((notification) => (
                            <Notification
                                key={notification.id}
                                {...notification}
                            />
                        ))}
                </div>
            )}
        </>
    );
};

const mapStateToProps = ({ notifications: { items } }) => ({
    notifications: items,
});

const mapDispatchToProps = (dispatch) => ({
    notificationActions: bindActionCreators(notificationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
