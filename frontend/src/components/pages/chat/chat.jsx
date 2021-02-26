import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { bindActionCreators } from "redux";

import { wsService } from "../../../services/ws.service";
import { chatActions } from "../../../store/actions";

import DefaultAvatarIMG from "images/default-avatar.svg";
import SendIMG from "images/send.svg";

import classNames from "./chat.module.scss";

const mapStateToProps = ({ chat, userInfo }) => ({ chat, userInfo });

const mapDispatchToProps = (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
});

const messages = [
    {
        sender: { id: 1, login: "borow", avatar: null },
        content: "Кабан",
        timestamp: new Date(),
    },
    {
        sender: { id: 2, login: "borow", avatar: null },
        content: "Кабан",
        timestamp: new Date(),
    },
    {
        content: "Кабан",
        timestamp: new Date(),
    },
    {
        sender: { id: 3, login: "borow", avatar: null },
        content: "Кабан",
        timestamp: new Date(),
    },
    {
        content: "Кабан",
        timestamp: new Date(),
    },
];

export const Chat = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ chat, userInfo, chatActions }) => {
    const query = new URLSearchParams(useLocation().search);
    const userId = query.get("userId");

    useEffect(() => {
        chatActions.getDialogue(userId);
    }, [userId]);

    const [messageText, setMessageText] = useState("");

    const sendMessage = () => {
        if (!messageText) return;

        wsService.sendMessage(userId, messageText);
        setMessageText("");
    };

    const renderMessage = ({ sender, content, timestamp }) => {
        return (
            <div className={classNames.message}>
                <img
                    src={
                        (sender ? sender.avatar : userInfo.avatar) ||
                        DefaultAvatarIMG
                    }
                />
                <div>
                    <p>{sender ? sender.login : userInfo.login}</p>
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
                    {messages.map((message) => renderMessage(message))}
                </div>
                <div className={classNames.messageInputContainer}>
                    <textarea
                        placeholder="Сообщение"
                        value={messageText}
                        onChange={({ target: { value } }) =>
                            setMessageText(value)
                        }
                    />
                    <img src={SendIMG} onClick={sendMessage} />
                </div>
            </div>
        </div>
    );
});
