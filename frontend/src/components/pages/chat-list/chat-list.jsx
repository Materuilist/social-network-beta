import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";

import { CustomSearch } from "../../shared/custom-search/custom-search";
import { CustomLoader } from "../../shared/custom-loader/custom-loader";
import { chatsActions } from "../../../store/actions";

import classNames from "./chat-list.module.scss";

const mapStateToProps = ({ chats }) => ({ chats });

const mapDispatchToProps = (dispatch) => ({
    chatsActions: bindActionCreators(chatsActions, dispatch),
});

export const ChatList = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ chats, chatsActions }) => {

    useEffect(() => {
        chatsActions.getChats();
    }, []);

    const renderChatItem = (item) => {
        return (
            <div className={classNames.chatItem}>{JSON.stringify(item)}</div>
        );
    };

    return (
        <div className={classNames.chat}>
            <div className={classNames.content}>
                <div>
                    <CustomSearch />
                    <div className={classNames.chatsContainer}>
                        <CustomLoader isLoading={chats.isLoading} />
                        {chats.data.length ? (
                            chats.data.map((chatItem) =>
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
