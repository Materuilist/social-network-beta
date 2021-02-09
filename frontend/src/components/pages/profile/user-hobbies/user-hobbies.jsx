import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { CustomLoader } from "../../../shared/custom-loader/custom-loader";
import { hobbiesActions } from "../../../../store/actions";

import classNames from "./user-hobbies.module.scss";

const mapStateToProps = ({ hobbies }) => ({
    hobbies,
});

const mapDispatchToProps = (dispatch) => ({
    hobbiesActions: bindActionCreators(hobbiesActions, dispatch),
});

export const UserHobbies = connect(
    mapStateToProps,
    mapDispatchToProps
)(({hobbies, hobbiesActions}) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        hobbiesActions.getOwnHobbies(() => setIsLoading(false));
    }, []);

    return (
        <div className={classNames.userHobbies}>
            <CustomLoader isLoading={isLoading} />
            UserHobbies
        </div>
    );
});
