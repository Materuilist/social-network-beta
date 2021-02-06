import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { userInfoActions } from "actions";
import { CustomLoader } from "../../shared/custom-loader/custom-loader";

import classNames from "./profile.module.scss";

const mapStateToProps = ({ userInfo }) => ({
    userInfo,
});

const mapDispatchToProps = (dispatch) => ({
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
});

export const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(({userInfo, userInfoActions}) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!userInfo.login) {
            setIsLoading(true);
            userInfoActions.getInfo(() => setIsLoading(false));
        }
    }, []);

    return (
        <div className={classNames.profile}>
            <CustomLoader isLoading={isLoading} />
            Profile
        </div>
    );
});
