import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { authActions } from "../../store/actions";

const mapStateToProps = (state) => ({
    login: state.userInfo.login,
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
});

export const CheckUser = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ renderLayout, renderAuth, login, authActions }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        authActions.getUser(() => setIsLoading(false));
    }, []);

    return isLoading ? (
        <div>Loading...</div>
    ) : login ? (
        renderLayout()
    ) : (
        renderAuth()
    );
});
