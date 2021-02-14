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
    const [currentHobbies, setCurrentHobbies] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        hobbiesActions.getOwnHobbies(() => setIsLoading(false));

        setIsDictionaryLoading(true);
        dictionariesActions.getAvailableInterests(() =>
            setIsDictionaryLoading(false)
        );
    }, []);

    useEffect(() => setCurrentHobbies(hobbies.data.map(({ id }) => id)), [
        hobbies.data,
    ]);

    const reloadHobbies = () =>
        hobbiesActions.getOwnHobbies(() => {
            dictionariesActions.getAvailableInterests(() => {
                setIsLoading(false);
                setIsDictionaryLoading(false);
            });
        });

    const deleteHobby = (id) => {
        setIsLoading(true);
        setIsDictionaryLoading(true);
        id && hobbiesActions.deleteHobbies([id], reloadHobbies);
    };

    const onCheckAll = () => {
        setIsLoading(true);
        setIsDictionaryLoading(true);
        const hobbiesToAdd = dictionaries.interests.map(({ id }) => id);
        hobbiesActions.addHobbies([], hobbiesToAdd, reloadHobbies);
    };

    const dismissAll = () => {
        setIsLoading(true);
        setIsDictionaryLoading(true);
        const hobbiesToDelete = hobbies.data.map(({ id }) => id);
        hobbiesActions.deleteHobbies(hobbiesToDelete, reloadHobbies);
    };

    const onSelectToggle = (isOpen) => {
        if (isOpen || isLoading) return;

        const hobbiesToAdd = currentHobbies.filter(
            (selectedHobbyId) =>
                !hobbies.data.find((hobby) => selectedHobbyId === hobby.id)
        );
        const hobbiesToDelete = hobbies.data
            .filter(
                (hobby) =>
                    !currentHobbies.find(
                        (selectedHobbyId) => hobby.id === selectedHobbyId
                    )
            )
            .map(({ id }) => id);

        if (hobbiesToAdd.length === 0 && hobbiesToDelete.length === 0) return;

        setIsLoading(true);
        setIsDictionaryLoading(true);
        hobbiesToAdd.length > 0
            ? hobbiesActions.addHobbies(
                  [],
                  hobbiesToAdd,
                  hobbiesToDelete.length > 0
                      ? () =>
                            hobbiesActions.deleteHobbies(
                                hobbiesToDelete,
                                reloadHobbies
                            )
                      : reloadHobbies
              )
            : hobbiesActions.deleteHobbies(hobbiesToDelete, reloadHobbies);
    };

    const addCustomHobby = (customHobbyNaming) => {
        if (!customHobbyNaming) return;
        setIsLoading(true);
        setIsDictionaryLoading(true);
        hobbiesActions.addHobbies([customHobbyNaming], [], reloadHobbies);
    };

    const renderCustomHobby = () => {
        return (
            <Hobby
                text="Свое хобби"
                isEditable={true}
                onAddHobby={(naming) => addCustomHobby(naming)}
            />
        );
    };

    return (
        <div className={classNames.userHobbies}>
            <CustomLoader isLoading={isLoading} />
            <div>
                <CustomSelect
                    busy={isDictionaryLoading || isLoading}
                    options={dictionaries.interests}
                    multiple={true}
                    onToggle={onSelectToggle}
                    value={currentHobbies}
                    onChange={(value) => setCurrentHobbies(value)}
                    onDismissAll={dismissAll}
                    onCheckAll={onCheckAll}
                />
                <div className={classNames.hobbiesContainer}>
                    {renderCustomHobby()}
                    {!isLoading &&
                        hobbies.data &&
                        hobbies.data.length > 0 &&
                        hobbies.data.map((hobby) => (
                            <Hobby
                                key={hobby.id}
                                text={hobby.name}
                                isDeleteable={true}
                                onDeleteHobby={() => deleteHobby(hobby.id)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
});
