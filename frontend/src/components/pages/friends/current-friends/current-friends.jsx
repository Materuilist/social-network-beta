import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";

import { friendsActions } from "../../../../store/actions";
import { CustomSearch } from "../../../shared/custom-search/custom-search";
import { CustomLoader } from "../../../shared/custom-loader/custom-loader";

import classNames from "./current-friends.module.scss";
import { UserItem } from "../user-item";
import { otherUserTypes } from "../../../../constants";

const mapStateToProps = ({ friends: { current, filters } }) => ({
    friends: current,
    filter: filters.currentFriends,
});

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
});

export const CurrentFriends = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ friends, friendsActions, filter }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchedOptions, setSearchedOptions] = useState([]);

    const filteredFriends = useMemo(() => {
        return friends.filter(({ isOnline, statuses }) => {
            const isOnlineSatisfies =
                !filter.isOnline || filter.isOnline === isOnline;
            //все статусы должны свопадать
            const statusesSatisfy =
                filter.statuses.length === 0 ||
                statuses.filter((activeStatus) =>
                    filter.statuses.find(
                        (neededStatusId) => neededStatusId === activeStatus._id
                    )
                ).length === filter.statuses.length;
            return isOnlineSatisfies && statusesSatisfy;
        });
    }, [friends, filter]);

    useEffect(() => {
        friendsActions.getFriends(() => setIsLoading(false));
    }, []);

    const toggleStatus = (userId, statusId) => {
        if (!userId || !statusId) return;

        setIsLoading(true);
        friendsActions.toggleStatus(userId, statusId, () =>
            friendsActions.getFriends(() => setIsLoading(false))
        );
    };

    const deleteFriend = (userId) => {
        if (!userId) return;

        setIsLoading(true);
        friendsActions.deleteFriend(userId, () =>
            friendsActions.getFriends(() => setIsLoading(false))
        );
    };

    return (
        <div className={classNames.currentFriends}>
            <CustomLoader
                isLoading={isLoading}
                isBackdropVisible={false}
                loaderColor="#ebfcf7"
                opacity='1'
            />
            <CustomSearch
                placeholder="Поиск"
                searchField="login"
                defaultSearchText={filter.searchText}
                onSearchTextChange={(newSearchText) =>
                    friendsActions.changeFriendsFilter(
                        "searchText",
                        newSearchText
                    )
                }
                options={filteredFriends}
                onChange={(newOptions) => setSearchedOptions(newOptions)}
            />
            {!isLoading && (
                <>
                    {searchedOptions.length ? (
                        <div className={classNames.ownFriends}>
                            <h4>Мои друзья</h4>
                            <div className={classNames.friendsContainer}>
                                {searchedOptions.map(
                                    ({
                                        id,
                                        login,
                                        isOnline,
                                        statuses,
                                        avatar,
                                    }) => (
                                        <UserItem
                                            key={id}
                                            id={id}
                                            login={login}
                                            avatar={avatar}
                                            isOnline={isOnline}
                                            statuses={statuses}
                                            userType={otherUserTypes.FRIEND}
                                            onStatusToggle={toggleStatus}
                                            onDelete={() => deleteFriend(id)}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    ) : (
                        <p>
                            У вас пока нет друзей...{" "}
                            <NavLink to="/friends/search">Добавить.</NavLink>
                        </p>
                    )}
                </>
            )}
        </div>
    );
});
