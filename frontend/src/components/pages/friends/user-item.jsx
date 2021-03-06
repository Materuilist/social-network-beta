import React, { useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";

import {
    friendsActions,
    otherUserProfileModalActions,
} from "../../../store/actions";
import { otherUserTypes } from "../../../constants";

import DefaultAvatarIMG from "images/default-avatar-dark.svg";
import MessageIMG from "images/message.svg";
import DeleteFriendIMG from "images/delete-friend.svg";
import AddFriendIMG from "images/add-friend.svg";

import "./user-item.scss";
import { store } from "../../../store";

const UserItemComponent = ({
    userType = otherUserTypes.STRANGER,
    statuses = [],
    isOnline = false,
    avatar,
    login = "Аноним",
    id,
    statusesDictionary,
    onlineStatuses,
    otherUserProfileModalActions,
    onAdd = (userId) => {},
    onDelete = (userId) => {},
    onStatusToggle = (userId, statusId) => {},
}) => {
    const actualIsOnline = useMemo(() => {
        const userOnlineStatus = onlineStatuses.find(
            ({ userId }) => userId === id
        );
        return userOnlineStatus?.isOnline ?? isOnline;
    }, [id, isOnline, onlineStatuses]);

    const openProfile = () => {
        otherUserProfileModalActions.open(id);
    };

    //статус наличия в друзьях тоже здесь (добавление || удаление)
    const renderStatuses = () => {
        switch (userType) {
            case otherUserTypes.STRANGER: {
                return (
                    <img
                        src={AddFriendIMG}
                        title="Отправить запрос в друзья"
                        onClick={() => onAdd(id)}
                    />
                );
            }
            case otherUserTypes.INCOMING_REQUEST: {
                return (
                    <>
                        <img
                            src={AddFriendIMG}
                            title="Принять запрос в друзья"
                            onClick={() => onAdd(id)}
                        />
                        <img
                            src={DeleteFriendIMG}
                            title="Отклонить запрос в друзья"
                            onClick={() => onDelete(id)}
                        />
                    </>
                );
            }
            case otherUserTypes.OUTCOMING_REQUEST: {
                return (
                    <img
                        src={DeleteFriendIMG}
                        title="Отменить запрос в друзья"
                        onClick={() => onDelete(id)}
                    />
                );
            }
            case otherUserTypes.FRIEND: {
                return (
                    <>
                        <img
                            src={DeleteFriendIMG}
                            title="Удалить из друзей"
                            onClick={() => onDelete(id)}
                        />
                        <div className="user-item__statuses">
                            {statusesDictionary.map(
                                ({ id: statusId, name, icon }) => {
                                    const isActive = Boolean(
                                        statuses.find(
                                            (activeStatus) =>
                                                activeStatus._id === statusId
                                        )
                                    );
                                    return (
                                        <img
                                            key={statusId}
                                            src={icon}
                                            onClick={() =>
                                                onStatusToggle(id, statusId)
                                            }
                                            title={`${
                                                isActive
                                                    ? "Снять"
                                                    : "Установить"
                                            } для ${login} статус "${name}"`}
                                            className={isActive ? "active" : ""}
                                        />
                                    );
                                }
                            )}
                        </div>
                    </>
                );
            }
        }
    };

    return (
        <div className="user-item">
            <img src={avatar ?? DefaultAvatarIMG} onClick={openProfile} />
            <div>
                <div>
                    <span onClick={openProfile}>{login}</span>
                    {renderStatuses()}
                </div>
                <p>{actualIsOnline ? "online" : "offline"}</p>
            </div>
            {userType === otherUserTypes.FRIEND ? (
                <img
                    src={MessageIMG}
                    title={`Начать общение с ${login}`}
                    onClick={() => store.dispatch(push(`/chat?userId=${id}`))}
                />
            ) : (
                <img />
            )}
        </div>
    );
};

const mapStateToProps = ({
    dictionaries: { friendsStatuses },
    onlineData: { onlineStatuses },
}) => ({
    statusesDictionary: friendsStatuses,
    onlineStatuses,
});

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
    otherUserProfileModalActions: bindActionCreators(
        otherUserProfileModalActions,
        dispatch
    ),
});

export const UserItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserItemComponent);
