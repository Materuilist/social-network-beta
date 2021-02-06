import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userInfoActions } from "../../store/actions";
import { CustomLoader } from "../shared/custom-loader/custom-loader";

const mapStateToProps = (state) => ({
    login: state.userInfo.login,
});

const mapDispatchToProps = (dispatch) => ({
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
});

export const CheckUser = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ renderLayout, renderAuth, login, userInfoActions }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userInfoActions.getInfo(() => setIsLoading(false));
    }, []);

    return isLoading ? (
        <div className="position-relative vw-100 vh-100">
            <CustomLoader isLoading={true} />
        </div>
    ) : login ? (
        renderLayout()
    ) : (
        renderAuth()
    );
});
