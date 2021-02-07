import React, { useEffect, useRef, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userInfoActions } from "actions";
import { CustomLoader } from "../../shared/custom-loader/custom-loader";
import { getFileBinary } from "../../../helpers";

import DefaultAvatarIMG from "images/default-avatar.svg";
import UploadIMG from "images/upload.svg";

import classNames from "./profile.module.scss";
import { CustomRadioButton } from "../../shared/custom-radiobutton/custom-radiobutton";

const mapStateToProps = ({ userInfo }) => ({ userInfo });

const mapDispatchToProps = (dispatch) => ({
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
});

export const MainInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ userInfo: { login, avatar }, userInfoActions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

    const avatarInputRef = useRef();

    useEffect(() => {
        if (!login) {
            setIsLoading(true);
            userInfoActions.getInfo(() => setIsLoading(false));
        }
    }, []);

    const updateAvatar = (event) => {
        if (event.target.files.length < 1) {
            return;
        }

        setIsUpdatingAvatar(true);
        const avatarFile = event.target.files[0];
        getFileBinary(avatarFile)
            .then((avatarBinary) => {
                userInfoActions.updateAvatar(avatarBinary, () =>
                    setIsUpdatingAvatar(false)
                );
            })
            .catch((err) => setIsUpdatingAvatar(false));
    };

    return (
        <div className={classNames.mainInfo}>
            <CustomLoader isLoading={isLoading} />
            <div>
                <div className={classNames.avatarContainer}>
                    <CustomLoader isLoading={isUpdatingAvatar} />
                    <img src={avatar || DefaultAvatarIMG} />
                    <div onClick={() => avatarInputRef.current.click()}>
                        <img src={UploadIMG} />
                        <span>Загрузить фото</span>
                        <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/*"
                            onInput={updateAvatar}
                            hidden
                        />
                    </div>
                </div>
                <Form>
                    <FormGroup>
                        <Label for="login">Логин</Label>
                        <Input
                            type="text"
                            name="login"
                            disabled
                            value={login}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="birthDate">Дата рождения</Label>
                        <Input type="date" name="birthDate" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Пол</Label>
                        <div className='d-flex'>
                            <CustomRadioButton name='sex' value='М' labelText='М' className='mr-3' />
                            <CustomRadioButton name='sex' value='М' labelText='Ж' />
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
});
