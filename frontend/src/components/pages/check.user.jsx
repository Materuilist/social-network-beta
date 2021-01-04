import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userInfoActions } from "../../store/actions";
import Loader from "../Shared/loader/loader";

const CheckUser = ({ children, userInfo, userInfoActions }) => {
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        userInfoActions.getUser(() => {
            setIsChecking(false);
        });
    }, []);

    return (
        <>
            {isChecking ? (
                <div>
                    <Loader isVisible={true} />
                </div>
            ) : (
                children
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckUser);
