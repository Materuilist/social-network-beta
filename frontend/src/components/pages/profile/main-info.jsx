import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userInfoActions, dictionariesActions } from "actions";
import { CustomLoader } from "../../shared/custom-loader/custom-loader";
import { getFileBinary } from "../../../helpers";
import { CustomRadioButton } from "../../shared/custom-radiobutton/custom-radiobutton";
import { CustomSelect } from "../../shared/custom-select/custom-select";

import DefaultAvatarIMG from "images/default-avatar.svg";
import UploadIMG from "images/upload.svg";

import classNames from "./profile.module.scss";

const mapStateToProps = ({ userInfo, dictionaries }) => ({
    userInfo,
    dictionaries,
});

const mapDispatchToProps = (dispatch) => ({
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
    dictionariesActions: bindActionCreators(dictionariesActions, dispatch),
});

export const MainInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
        userInfo: { login, avatar, sex, birthDate, city },
        dictionaries,
        userInfoActions,
        dictionariesActions,
    }) => {
        const [isLoading, setIsLoading] = useState(false);
        const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
        const [isLoadingCities, setIsLoadingCities] = useState(false);
        const [data, setData] = useState({
            sex,
            birthDate,
            city,
        });

        const avatarInputRef = useRef();

        useEffect(() => {
            if (!login) {
                setIsLoading(true);
                userInfoActions.getInfo(() => setIsLoading(false));
            }
            if (dictionaries.cities.length === 0) {
                setIsLoadingCities(true);
                dictionariesActions.getCities(() => setIsLoadingCities(false));
            }
        }, []);

        const saveChanges = (event) => {
            event.preventDefault();
            setIsLoading(true);
            userInfoActions.updateInfo(data, () => setIsLoading(false));
        };

        const updateInfoField = (name, value) => {
            console.log(name, value);
            setData({ ...data, [name]: value });
        };

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
                    <Form onSubmit={saveChanges}>
                        <div>
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
                                <Input
                                    type="date"
                                    name="birthDate"
                                    value={data.birthDate || ""}
                                    onChange={({ target: { value } }) =>
                                        updateInfoField("birthDate", value)
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Пол</Label>
                                <div className="d-flex">
                                    <CustomRadioButton
                                        name="sex"
                                        value="М"
                                        labelText="М"
                                        className="mr-3"
                                        onChange={(value) =>
                                            updateInfoField("sex", value)
                                        }
                                        checked={data.sex === "М"}
                                    />
                                    <CustomRadioButton
                                        name="sex"
                                        value="Ж"
                                        labelText="Ж"
                                        onChange={(value) =>
                                            updateInfoField("sex", value)
                                        }
                                        checked={data.sex === "Ж"}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Город</Label>
                                <CustomSelect
                                    busy={isLoadingCities}
                                    options={dictionaries.cities}
                                    value={data.city}
                                    onChange={(value) =>
                                        updateInfoField("city", value)
                                    }
                                />
                            </FormGroup>
                        </div>
                        <Button type="submit" className="light">
                            Сохранить изменения
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
);
