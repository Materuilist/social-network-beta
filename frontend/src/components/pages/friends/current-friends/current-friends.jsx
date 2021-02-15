import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";

import { friendsActions } from "../../../../store/actions";
import { CustomSearch } from "../../../shared/custom-search/custom-search";
import { CustomLoader } from "../../../shared/custom-loader/custom-loader";

import classNames from "./current-friends.module.scss";
import { UserItem } from "../user-item";

const mapStateToProps = ({ friends: { current } }) => ({
    friends: current,
});

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
});

export const CurrentFriends = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ friends, friendsActions }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        friendsActions.getFriends(() => setIsLoading(false));
    }, []);

    return (
        <div className={classNames.currentFriends}>
            <CustomLoader isLoading={isLoading} />
            <CustomSearch placeholder="Поиск" />
            {!isLoading && (
                <>
                    {friends.length ? (
                        <div className={classNames.ownFriends}>
                            <h4>Мои друзья</h4>
                            <div className={classNames.friendsContainer}>
                                {friends.map(({ id, login }) => (
                                    <UserItem key={id} id={id} login={login} />
                                ))}
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
