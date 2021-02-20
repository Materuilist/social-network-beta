import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import {
    dictionariesActions,
    otherUserProfileModalActions,
} from "../../../../store/actions";
import { CustomLoader } from "../../custom-loader/custom-loader";

import MessageIMG from "images/message-light.svg";
import DeleteFriendIMG from "images/delete-friend-light.svg";
import AddFriendIMG from "images/add-friend-light.svg";
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
    }) => {
        const [isLoading, setIsLoading] = useState(true);
        const [areDictionariesLoading, setAreDictionaryLoading] = useState(
            true
        );
        useEffect(() => {
            otherUserProfileModalActions.getInfo(() => setIsLoading(false));
            dictionariesActions.getFriendsStatuses(() =>
                setAreDictionaryLoading(false)
            );
        }, [userId]);

        return (
            <div className="other-user-profile__info-tab">
                <div className="info-tab__col">
                    <div>
                        <div className="avatar-container">
                            <CustomLoader
                                isLoading={isLoading}
                                isBackdropVisible={false}
                                isLight={false}
                            />
                            <img
                                src={info.avatar || DefaultAvatarIMG}
                                isBackdropVisible={false}
                            />
                        </div>
                        {info.isFriend && info.statuses && (
                            <div className="statuses-container">
                                <CustomLoader
                                    isLoading={areDictionariesLoading}
                                    isBackdropVisible={false}
                                    isLight={false}
                                />
                                {statusesDictionary &&
                                    statusesDictionary.map(
                                        ({ id, name, icon }) => {
                                            const isActive = info.statuses.find(
                                                (activeStatusId) =>
                                                    activeStatusId === id
                                            );

                                            return (
                                                <img
                                                    key={id}
                                                    src={icon}
                                                    title={`${
                                                        isActive
                                                            ? "Снять"
                                                            : "Установить"
                                                    } для ${
                                                        info.login
                                                    } статус "${name}"`}
                                                    className={
                                                        isActive ? "active" : ""
                                                    }
                                                />
                                            );
                                        }
                                    )}
                            </div>
                        )}
                    </div>
                    <div>
                        {info.isFriend ? (
                            <>
                                <img src={DeleteFriendIMG} />{" "}
                                <img src={MessageIMG} />
                            </>
                        ) : (
                            <img src={AddFriendIMG} />
                        )}
                    </div>
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
