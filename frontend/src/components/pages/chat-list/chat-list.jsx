import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";

import { CustomSearch } from "../../shared/custom-search/custom-search";
import { CustomLoader } from "../../shared/custom-loader/custom-loader";
import { chatsActions } from "../../../store/actions";

import DefaultAvatarIMG from "images/default-avatar-dark.svg";

import classNames from "./chat-list.module.scss";
import { store } from "../../../store";
import { push } from "connected-react-router";

const mapStateToProps = ({ chats, userInfo }) => ({ chats, userInfo });

const mapDispatchToProps = (dispatch) => ({
    chatsActions: bindActionCreators(chatsActions, dispatch),
});

export const ChatList = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ userInfo, chats, chatsActions }) => {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        chatsActions.getChats();
    }, []);

    const filteredChats = useMemo(() => {
        if (!chats.data.length) return [];

        return chats.data.filter(({ otherUser: { login } }) =>
            login.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText, chats.data]);

    const renderChatItem = ({ id, otherUser, lastMessage }) => {
        return (
            <div
                key={id}
                className={classNames.chatItem}
                onClick={() =>
                    store.dispatch(push(`/chat?userId=${otherUser.id}`))
                }
            >
                <img src={otherUser?.avatar || DefaultAvatarIMG} />
                <div>
                    <p>{otherUser?.login}</p>
                    <p>{otherUser?.isOnline ? "online" : "offline"}</p>
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
                        isLoading={chats.isLoading}
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
