import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    ChoiceGroup,
    ChoiceGroupOption,
    Dropdown,
    MaskedTextField,
    Slider,
    TextField,
} from "@fluentui/react";

import { dictionariesActions, userInfoActions } from "../../../store/actions";
import Loader from "../../Shared/loader/loader";
import defaultAvatar from "../../../static/images/default-avatar.svg";

import classNames from "./profile.module.scss";
import { convertDictionary } from "../../../helpers/convertDictionary";
import { DropdownList } from "react-widgets";
import { checkPhoneValidity, getPhone } from "../../../helpers";

const Profile = ({
    userInfo,
    userInfoActions,
    dictionariesActions,
    dictionaries,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const { login, avatar, sex, age, city, phone } = userInfo;

    useEffect(() => {
        dictionariesActions.getCities(null, null, true, () =>
            userInfoActions.getUserInfo(null, () => setIsLoading(false))
        );
    }, []);

    const saveChanges = () => {
        setIsLoading(true);
        userInfoActions.saveUserInfo(() => setIsLoading(false));
    };

    const updateUserInfo = (field, value) => {
        userInfoActions.setUserInfo({ [field]: value });
    };

    return (
        <div className={classNames.profile}>
            {isLoading ? (
                <div className="position-relative h-100 w-100">
                    <Loader isVisible={true} />
                </div>
            ) : (
                <div className={classNames.mainInfo}>
                    <img
                        src={avatar || defaultAvatar}
                        className={classNames.avatar}
                    />
                    <div>
                        <div className="d-flex justify-content-between">
                            <TextField
                                value={login}
                                readOnly={true}
                                label="Логин"
                            />
                            <ChoiceGroup
                                name="sex"
                                selectedKey={sex}
                                options={[
                                    { key: "M", text: "Мужской" },
                                    { key: "F", text: "Женский" },
                                ]}
                                onChange={(event, option) =>
                                    updateUserInfo("sex", option.key)
                                }
                            />
                        </div>
                        <Slider
                            value={age}
                            onChange={(value) => updateUserInfo("age", value)}
                            label="Возраст"
                            min={0}
                            max={100}
                        />
                        <DropdownList
                            data={dictionaries.cities}
                            valueField="id"
                            textField="name"
                            filter="contains"
                            value={city}
                            onChange={(value) => updateUserInfo("city", value)}
                        />
                        <MaskedTextField
                            label='Телефон'
                            mask="9(999)-999-99-99"
                            value={phone}
                            onChange={(event, value) =>
                                updateUserInfo("phone", getPhone(value))
                            }
                            errorMessage={checkPhoneValidity(phone)?null:'Неверный формат'}
                        />
                    </div>

                    {/* 
                        <CustomInput
                            label="Город"
                            type="select"
                            name="city"
                            value={city}
                            onChange={(value) => updateUserInfo("city", value)}
                            options={dictionaries.cities}
                        /> */}
                </div>
            )}
        </div>
    );
};

const mapStateToProps = ({ userInfo, dictionaries }) => ({
    userInfo,
    dictionaries,
});

const mapDispatchToProps = (dispatch) => ({
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
    dictionariesActions: bindActionCreators(dictionariesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
