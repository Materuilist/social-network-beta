import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { bindActionCreators } from "redux";
import concatClasses from "classnames";

import { CustomLoader } from "../../shared/custom-loader/custom-loader";
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
    const [isLoading, setIsLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);

    const messagesContainerRef = useRef();
    const messageInputRef = useRef();

    useEffect(() => {
        messagesContainerRef.current.onscroll = loadMoreCallback;
    }, loadMoreCallback);

    const loadMoreCallback = useCallback(
        ({ target }) => {
            if (chat.messages.nextPageExists && target.scrollTop === 0) {
                console.log({ pageIndex });
                setPageIndex(pageIndex + 1);
            }
        },
        [pageIndex, chat.messages.nextPageExists]
    );

    const getMessages = (page = 1, cb) => {
        console.log(page);
        setIsLoading(true);
        chatActions.getDialogue(userId, page, () => {
            cb?.();
            setIsLoading(false);
        });
    };

    useEffect(() => {
        if (pageIndex === 0) return;

        if (pageIndex === 1) {
            getMessages(1, () => {
                messagesContainerRef.current.scrollTo(
                    0,
                    messagesContainerRef.current.scrollHeight
                );
            });
        } else {
            const previousScrollHeight =
                messagesContainerRef.current.scrollHeight;
            getMessages(pageIndex, () =>
                messagesContainerRef.current.scrollBy(
                    0,
                    messagesContainerRef.current.scrollHeight -
                        previousScrollHeight
                )
            );
        }
    }, [pageIndex]);

    useEffect(() => {
        setPageIndex(1);

        return () => {
            chatActions.clear();
        };
    }, [userId]);

    const sendMessage = () => {
        if (!messageText) return;

        chatActions.sendMessage(messageText, userId);
        setMessageText("");
        messageInputRef.current.innerText = '';
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
                <CustomLoader
                    isLoading={isLoading}
                    isBackdropVisible={false}
                    opacity=".8"
                    isLight={false}
                />
                <div
                    className={classNames.messagesContainer}
                    ref={messagesContainerRef}
                >
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
                        ref={messageInputRef}
                        contentEditable
                        onInput={({ target }) =>
                            setMessageText(target.innerText)
                        }
                        placeholder={messageText ? "false" : "true"}
                    ></div>
                    <div className={classNames.messageSendButtonContainer}>
                        <CustomLoader
                            isLoading={chat.isSending}
                            isBackdropVisible={false}
                            opacity=".8"
                            isLight={false}
                            size={35}
                        />
                        <img
                            style={{
                                visibility: chat.isSending
                                    ? "hidden"
                                    : "visible",
                            }}
                            src={SendIMG}
                            onClick={sendMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
