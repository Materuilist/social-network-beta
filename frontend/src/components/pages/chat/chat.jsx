import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { bindActionCreators } from "redux";
import concatClasses from "classnames";

import { wsService } from "../../../services/ws.service";
import { chatActions } from "../../../store/actions";

import DefaultAvatarIMG from "images/default-avatar-dark.svg";
import SendIMG from "images/send.svg";

import classNames from "./chat.module.scss";

const mapStateToProps = ({ chat, userInfo }) => ({ chat, userInfo });

const mapDispatchToProps = (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
});

export const Chat = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ chat, userInfo, chatActions }) => {
    const query = new URLSearchParams(useLocation().search);
    const userId = query.get("userId");
    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        chatActions.getDialogue(userId);
    }, [userId]);

    const sendMessage = () => {
        if (!messageText) return;

        wsService.sendMessage(userId, messageText);
        setMessageText("");
    };

    const renderMessage = ({ _id, sender: senderId, content, timestamp }) => {
        const isFromOtherUser = senderId !== userInfo.id;

        return (
            <div
                key={_id}
                className={concatClasses(classNames.message, {
                    [classNames.ownMessage]: !isFromOtherUser,
                })}
            >
                <img
                    src={
                        (isFromOtherUser
                            ? chat.otherUser?.avatar
                            : userInfo.avatar) || DefaultAvatarIMG
                    }
                />
                <div className={classNames.messageContent}>
                    <p>
                        {isFromOtherUser
                            ? chat.otherUser?.login
                            : userInfo.login}
                    </p>
                    <p>{content}</p>
                </div>
                <span>{moment(timestamp).format("hh:mm DD.MM.YYYY")}</span>
            </div>
        );
    };

    return (
        <div className={classNames.chat}>
            <div>
                <div className={classNames.messagesContainer}>
                    {chat.messages.data
                        .sort(
                            (
                                { timestamp: timestampA },
                                { timestamp: timestampB }
                            ) => new Date(timestampA) - new Date(timestampB)
                        )
                        .map((message) => renderMessage(message))}
                </div>
                <div className={classNames.messageInputContainer}>
                    <div
                        contentEditable
                        onInput={({ target }) =>
                            setMessageText(target.innerText)
                        }
                        placeholder={messageText ? "false" : "true"}
                    ></div>
                    <img src={SendIMG} onClick={sendMessage} />
                </div>
            </div>
        </div>
    );
});
