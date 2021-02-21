import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import {
    dictionariesActions,
    friendsActions,
    otherUserProfileModalActions,
} from "../../../../store/actions";
import { CustomLoader } from "../../custom-loader/custom-loader";

import DefaultAvatarIMG from "images/default-avatar.svg";
import MaleIMG from "images/male-icon.svg";
import FemaleIMG from "images/female-icon.svg";

const mapStateToProps = ({
    otherUserProfileModal: { userId, info },
    dictionaries,
}) => ({
    userId,
    info,
    statusesDictionary: dictionaries.friendsStatuses,
});

const mapDispatchToProps = (dispatch) => ({
    otherUserProfileModalActions: bindActionCreators(
        otherUserProfileModalActions,
        dispatch
    ),
    dictionariesActions: bindActionCreators(dictionariesActions, dispatch),
    friendsActions: bindActionCreators(friendsActions, dispatch),
});

export const UserProfileInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
        userId,
        info,
        statusesDictionary,
        otherUserProfileModalActions,
        dictionariesActions,
        friendsActions,
    }) => {
        const [isLoading, setIsLoading] = useState(true);
        const [areDictionariesLoading, setAreDictionariesLoading] = useState(
            true
        );
        useEffect(() => {
            otherUserProfileModalActions.getInfo(() => setIsLoading(false));
            dictionariesActions.getFriendsStatuses(() =>
                setAreDictionariesLoading(false)
            );
        }, [userId]);

        const toggleStatus = (statusId) => {
            if (!userId || !statusId) return;

            setIsLoading(true);
            setAreDictionariesLoading(true);
            friendsActions.toggleStatus(userId, statusId, () => {
                otherUserProfileModalActions.getInfo(() => {
                    setAreDictionariesLoading(false);
                    setIsLoading(false);
                });
                friendsActions.getFriends();
            });
        };

        return (
            <div className="other-user-profile__info-tab">
                <div className="info-tab__col">
                    <div className="avatar-container">
                        <CustomLoader
                            isLoading={isLoading}
                            isBackdropVisible={false}
                            isLight={false}
                        />
                        <img
                            src={info.avatar || DefaultAvatarIMG}
                        />
                    </div>
                    {info.isFriend && info.statuses && (
                        <div className="statuses-container">
                            <CustomLoader
                                isLoading={areDictionariesLoading}
                                isBackdropVisible={false}
                                isLight={false}
                                size={30}
                            />
                            {statusesDictionary &&
                                statusesDictionary.map(({ id, name, icon }) => {
                                    const isActive = info.statuses.find(
                                        (activeStatusId) =>
                                            activeStatusId === id
                                    );

                                    return (
                                        <img
                                            key={id}
                                            onClick={() => toggleStatus(id)}
                                            src={icon}
                                            title={`${
                                                isActive
                                                    ? "Снять"
                                                    : "Установить"
                                            } для ${
                                                info.login
                                            } статус "${name}"`}
                                            className={isActive ? "active" : ""}
                                        />
                                    );
                                })}
                        </div>
                    )}
                </div>
                <div className="info-tab__col">
                    <CustomLoader
                        isLoading={isLoading}
                        isBackdropVisible={false}
                        isLight={false}
                    />
                    <p>{info.login || "Аноним"}</p>
                    <p>
                        {info.isOnline != null
                            ? info.isOnline
                                ? "online"
                                : "offline"
                            : ""}
                    </p>
                    <p>
                        Пол:{" "}
                        {(info.sex && (
                            <img src={info.sex === "М" ? MaleIMG : FemaleIMG} />
                        )) ??
                            "-"}
                    </p>
                    <p>
                        День рождения:{" "}
                        {(info.birthDate &&
                            moment(info.birthDate).format("DD.MM.YYYY")) ??
                            "-"}
                    </p>
                    <p>Город: {(info.city && info.city.name) ?? "-"}</p>
                </div>
            </div>
        );
    }
);
