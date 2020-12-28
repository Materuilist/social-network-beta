import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { notificationTypes } from "../../../constants";
import { notificationActions } from "../../../store/actions";

import ErrorIcon from "../../../static/images/icons/error.svg";

import classNames from "./notifications.module.scss";

const Notification = ({
    id,
    content,
    headerText,
    type,
    notificationActions,
}) => {
    const getAlignmentClassName = () =>
        id % 2 === 0 ? classNames.right : classNames.left;

    const getIcon = () => {
        switch (type) {
            case notificationTypes.success: {
                return null;
            }
            case notificationTypes.warning: {
                return null;
            }
            case notificationTypes.error: {
                return ErrorIcon;
            }
            default:
                return null;
        }
    };

    const renderByType = () => {
        switch (type) {
            case notificationTypes.success:
            case notificationTypes.warning:
            case notificationTypes.error: {
                return (
                    <div
                        className={[
                            classNames.notification,
                            classNames[type],
                            getAlignmentClassName(),
                        ].join(" ")}
                        onClick={() =>
                            notificationActions.dismissNotification(id)
                        }
                    >
                        <div className={classNames.icon}>
                            <img src={getIcon()} />
                        </div>
                        <div className={classNames.preview}>
                            <p>
                                <span>{content}</span>
                            </p>
                        </div>
                    </div>
                );
            }
            default:
                return null;
        }
    };

    return <>{renderByType()}</>;
};

const mapDispatchToProps = (dispatch) => ({
    notificationActions: bindActionCreators(notificationActions, dispatch),
});

export default connect(null, mapDispatchToProps)(Notification);
