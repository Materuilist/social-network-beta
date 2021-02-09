import React, { useState } from "react";
import { Input } from "reactstrap";

import CrossIMG from "images/cross.svg";
import TickIMG from "images/tick.svg";
import EditIMG from "images/edit-pencil.svg";

import "./hobby.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { notificationsActions } from "../../../store/actions";

const HobbyComponent = ({
    isEditable = false,
    isDeleteable = false,
    onAddHobby,
    onDeleteHobby,
    text,
    minLength = 3,
    maxLength = 20,
    notificationsActions,
}) => {
    const [isEditionMode, setIsEditionMode] = useState(false);
    const [customHobbyName, setCustomHobbyName] = useState("");

    const saveHobby = () => {
        if (
            customHobbyName.length >= minLength &&
            customHobbyName.length <= maxLength
        ) {
            setIsEditionMode(false);
            setCustomHobbyName("");
            onAddHobby && onAddHobby(customHobbyName);
        } else {
            notificationsActions.notifyError(
                "Длина названия интереса",
                `Длина названия интереса должна быть в пределах ${minLength} - ${maxLength} букв!`
            );
        }
    };

    return (
        <div className="user-hobby">
            {isEditionMode ? (
                <Input
                    type="text"
                    value={customHobbyName}
                    onChange={({ target: { value } }) =>
                        setCustomHobbyName(value)
                    }
                />
            ) : (
                <span title={text}>{text}</span>
            )}
            {(isDeleteable || isEditable) && (
                <div className="user-hobby__btn-group">
                    {isEditable &&
                        (isEditionMode ? (
                            <img
                                src={TickIMG}
                                title={`Добавить ${customHobbyName}`}
                                onClick={saveHobby}
                            />
                        ) : (
                            <img
                                src={EditIMG}
                                title={"Добавьте свое хобби!"}
                                onClick={() => setIsEditionMode(true)}
                            />
                        ))}
                    {isDeleteable && (
                        <img
                            src={CrossIMG}
                            title={`Удалить '${text}' из перечня своих интересов`}
                            onClick={onDeleteHobby}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
});

export const Hobby = connect(null, mapDispatchToProps)(HobbyComponent);
