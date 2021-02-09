import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { CustomLoader } from "../../../shared/custom-loader/custom-loader";
import { dictionariesActions, hobbiesActions } from "../../../../store/actions";

import classNames from "./user-hobbies.module.scss";

const mapStateToProps = ({ hobbies, dictionaries }) => ({
    hobbies,
    dictionaries,
});

const mapDispatchToProps = (dispatch) => ({
    hobbiesActions: bindActionCreators(hobbiesActions, dispatch),
    dictionariesActions: bindActionCreators(dictionariesActions, dispatch),
});

export const UserHobbies = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ hobbies, dictionaries, hobbiesActions, dictionariesActions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDictionaryLoading, setIsDictionaryLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        hobbiesActions.getOwnHobbies(() => setIsLoading(false));

        setIsDictionaryLoading(true);
        dictionariesActions.getAvailableInterests(() =>
            setIsDictionaryLoading(false)
        );
    }, []);

    return (
        <div className={classNames.userHobbies}>
            <CustomLoader isLoading={isLoading} />
            UserHobbies
        </div>
    );
});
