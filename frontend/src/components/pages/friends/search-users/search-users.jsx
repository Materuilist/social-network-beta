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

    return (
        <div className={classNames.strangersSearch}>
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
                            loader={
                                <CustomLoader key={0} isLoading={isLoading} />
                            }
                            threshold={1}
                        >
                            {strangers.map(({ _id, login }) => (
                                <UserItem key={_id} id={_id} login={login} />
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
            ) : (
                <p>Пользователи не найдены...</p>
            )}
        </div>
    );
});
