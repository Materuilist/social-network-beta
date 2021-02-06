import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userInfoActions } from "actions";
import { CustomLoader } from "../../shared/custom-loader/custom-loader";
import DefaultAvatarIMG from "images/default-avatar.svg";
import UploadIMG from "images/upload.svg";

import classNames from "./profile.module.scss";
import { getFileBinary } from "../../../helpers";

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
                <div></div>
            </div>
        </div>
    );
});
