import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { dictionariesActions, userInfoActions } from "../../../store/actions";
import Loader from "../../Shared/loader/loader";
import defaultAvatar from "../../../static/images/default-avatar.svg";

import classNames from "./profile.module.scss";
import { CustomInput } from "../../Shared/custom-input/custom.input";

const Profile = ({
    userInfo,
    userInfoActions,
    dictionariesActions,
    dictionaries,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const { login, avatar, sex, city } = userInfo;

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
                        <CustomInput type="text" value={login} label="Логин" />
                        <CustomInput
                            type="radio"
                            name="sex"
                            value={sex}
                            options={[
                                { value: "M", label: "M" },
                                { value: "F", label: "F" },
                            ]}
                            label="Пол"
                            onChange={(value) => updateUserInfo("sex", value)}
                        />
                        <CustomInput
                            label="Город"
                            type="select"
                            name="city"
                            value={city}
                            onChange={(value) => updateUserInfo("city", value)}
                            options={dictionaries.cities}
                        />
                    </div>
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
