import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { friendsActions } from "../../../store/actions";
import { otherUserTypes } from "../../../constants";

import DefaultAvatarIMG from "images/default-avatar-dark.svg";
import MessageIMG from "images/message.svg";
import DeleteFriendIMG from "images/delete-friend.svg";
import AddFriendIMG from "images/add-friend.svg";

import "./user-item.scss";

const UserItemComponent = ({
    userType = otherUserTypes.STRANGER,
    statuses = [],
    isOnline = false,
    avatar,
    login = "Аноним",
    id,
    onAdd = () => {},
    onDelete = () => {},
}) => {
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
                        <img src={DeleteFriendIMG} title="Удалить из друзей" />
                        <div className="user-item__statuses">
                            {statuses.map((status) => (
                                <span>{status.id}</span>
                            ))}
                        </div>
                    </>
                );
            }
        }
    };

    return (
        <div className="user-item">
            <img src={avatar ?? DefaultAvatarIMG} />
            <div>
                <div>
                    <span>{login}</span>
                    {renderStatuses()}
                </div>
                <p>{isOnline ? "online" : "offline"}</p>
            </div>
            <img src={MessageIMG} />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
});

export const UserItem = connect(null, mapDispatchToProps)(UserItemComponent);
