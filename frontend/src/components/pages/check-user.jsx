import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { wsService } from "../../services/ws.service";

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
        wsService.connect().then(
            () => {
                userInfoActions.getInfo(() => setIsLoading(false));
            },
            () => {
                setIsLoading(false);
            }
        );
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
