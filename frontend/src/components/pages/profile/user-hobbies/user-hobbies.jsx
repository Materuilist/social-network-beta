import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { CustomSelect } from "../../../shared/custom-select/custom-select";
import { CustomLoader } from "../../../shared/custom-loader/custom-loader";
import { dictionariesActions, hobbiesActions } from "../../../../store/actions";

import classNames from "./user-hobbies.module.scss";
import { Hobby } from "../../../shared/hobby/hobby";

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

    const renderCustomHobby = () => {
        return <Hobby text="Свое хобби" isEditable={true} />;
    };

    return (
        <div className={classNames.userHobbies}>
            <CustomLoader isLoading={isLoading} />
            <div>
                <CustomSelect
                    busy={isDictionaryLoading || isLoading}
                    options={dictionaries.interests}
                    multiple={true}
                />
                <div className={classNames.hobbiesContainer}>
                    {renderCustomHobby()}
                    {!isLoading &&
                        hobbies.data &&
                        hobbies.data.length > 0 &&
                        hobbies.data.map((hobby) => <Hobby text={"Hobby"} />)}
                </div>
            </div>
        </div>
    );
});
