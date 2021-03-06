import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroller";

import { UserItem } from "../user-item";
import { CustomSearch } from "../../../shared/custom-search/custom-search";
import { CustomLoader } from "../../../shared/custom-loader/custom-loader";
import { friendsActions } from "../../../../store/actions";
import { adjustPixels } from "../../../../helpers";

import classNames from "./search-users.module.scss";
import { otherUserTypes } from "../../../../constants";

const mapStateToProps = ({
    friends: {
        strangers: { data, isLoading, nextPageExists },
        filters,
    },
}) => ({
    strangers: data,
    nextPageExists,
    isLoading,
    filter: filters.strangers,
});

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
});

export const SearchUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ strangers, friendsActions, filter, isLoading, nextPageExists }) => {
    useEffect(() => {
        friendsActions.getStrangers(1);
    }, []);

    const addUser = (id) => {
        if (!id) return;

        friendsActions.toggleStrangersLoading(true);
        friendsActions.addFriend(id, () => {
            friendsActions.toggleStrangersLoading(false);
            friendsActions.setStrangers([]);
            friendsActions.getStrangers(1);
        });
    };

    return (
        <div className={classNames.strangersSearch}>
            <CustomLoader isLoading={isLoading} isBackdropVisible={false} isLight={false} opacity={'.8'} />
            <CustomSearch
                placeholder="Поиск"
                defaultSearchText={filter.searchText}
                onSearchTextChange={(searchText) =>
                    friendsActions.changeStrangersSearchText(searchText)
                }
            />
            {strangers.length ? (
                <div className={classNames.strangers}>
                    <h4>Поиск</h4>
                    <div className={classNames.strangersContainer}>
                        <InfiniteScroll
                            hasMore={nextPageExists}
                            loadMore={(pageIndex) => {
                                console.log(pageIndex);
                                setTimeout(() => {
                                    friendsActions.getStrangers(pageIndex);
                                });
                            }}
                            useWindow={false}
                            pageStart={1}
                            initialLoad={false}
                            threshold={1}
                        >
                            {strangers.map(
                                ({ _id, login, avatar, isOnline }) => (
                                    <UserItem
                                        key={_id}
                                        id={_id}
                                        login={login}
                                        onAdd={addUser}
                                        avatar={avatar}
                                        isOnline={isOnline}
                                        userType={otherUserTypes.STRANGER}
                                    />
                                )
                            )}
                        </InfiniteScroll>
                    </div>
                </div>
            ) : (
                <p>Пользователи не найдены...</p>
            )}
        </div>
    );
});
