import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { friendsActions } from "../../../store/actions";

import DefaultAvatarIMG from "images/default-avatar-dark.svg";
import MessageIMG from "images/message.svg";

import "./user-item.scss";

const UserItemComponent = ({
    isFriend = false,
    statuses = [],
    isOnline = false,
    avatar,
    login = "Аноним",
    id,
}) => {
    return (
        <div className="user-item">
            <img src={avatar ?? DefaultAvatarIMG} />
            <div>
                <div>
                    <span>{login}</span>
                    <div className="user-item__statuses">
                        {statuses.map((status) => (
                            <span>status.id</span>
                        ))}
                    </div>
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
