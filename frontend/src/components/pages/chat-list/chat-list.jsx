import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import { push } from "connected-react-router";

import { CustomSearch } from "../../shared/custom-search/custom-search";
import { CustomLoader } from "../../shared/custom-loader/custom-loader";
import { chatListActions } from "../../../store/actions";
import { store } from "../../../store";

import DefaultAvatarIMG from "images/default-avatar-dark.svg";

import classNames from "./chat-list.module.scss";

const mapStateToProps = ({
    chatList,
    userInfo,
    onlineData: { onlineStatuses },
}) => ({ chatList, userInfo, onlineStatuses });

const mapDispatchToProps = (dispatch) => ({
    chatListActions: bindActionCreators(chatListActions, dispatch),
});

export const ChatList = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ userInfo, chatList, onlineStatuses, chatListActions }) => {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        chatListActions.getChats();
    }, []);

    const filteredChats = useMemo(() => {
        if (!chatList.data.length) return [];

        return chatList.data.filter(({ otherUser: { login } }) =>
            login.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText, chatList.data]);

    const renderChatItem = ({ id, otherUser, lastMessage }) => {
        const isUserActuallyOnline =
            otherUser?.id === userInfo.id ||
            (onlineStatuses.find(({ userId }) => userId === otherUser?.id)?.isOnline ??
                otherUser?.isOnline);

        return (
            <div
                key={id}
                className={classNames.chatItem}
                onClick={() =>
                    store.dispatch(push(`/chat?userId=${otherUser?.id}`))
                }
            >
                <img src={otherUser?.avatar || DefaultAvatarIMG} />
                <div>
                    <p>{otherUser?.login}</p>
                    <p>{isUserActuallyOnline ? "online" : "offline"}</p>
                </div>
                <div>
                    {lastMessage?.sender === userInfo.id ? (
                        <span>Вы:</span>
                    ) : null}
                    <span>{lastMessage?.content}</span>
                </div>
            </div>
        );
    };

    return (
        <div className={classNames.chat}>
            <div className={classNames.content}>
                <div>
                    <CustomLoader
                        isLoading={chatList.isLoading}
                        isBackdropVisible={false}
                        opacity=".8"
                        isLight={false}
                    />
                    <CustomSearch
                        defaultSearchText={searchText}
                        onSearchTextChange={(value) => setSearchText(value)}
                    />
                    <div className={classNames.chatsContainer}>
                        {filteredChats.length ? (
                            filteredChats.map((chatItem) =>
                                renderChatItem(chatItem)
                            )
                        ) : (
                            <p>
                                Вы пока ни с кем не переписывались. Можете
                                выбрать друга для начала переписки{" "}
                                <NavLink to="/friends/current">здесь</NavLink>.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
