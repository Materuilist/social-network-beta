import React from "react";
import {
    NavLink,
    Redirect,
    Route,
    Switch,
    useRouteMatch,
} from "react-router-dom";

import { CurrentFriends } from "./current-friends/current-friends";
import { SearchUsers } from "./search-users/search-users";
import { FriendRequests } from "./friend-requests/friend-requests";
import { FriendsFilter } from "./filters/friends.filter";
import { StrangersFilter } from "./filters/strangers.filter";

import "./friends.scss";

export const Friends = () => {
    const { path } = useRouteMatch();

    const renderLinks = () => (
        <div className="friends-page__content__nav-tabs">
            <NavLink to={`${path}/current`}>Мои друзья</NavLink>
            <NavLink to={`${path}/search`}>Поиск</NavLink>
            <NavLink to={`${path}/requests`}>Заявки</NavLink>
        </div>
    );

    return (
        <div className="friends-page">
            <Switch>
                <Route path={`${path}/current`}>
                    <div className="friends-page__content">
                        {renderLinks()}
                        <div className="friends-page__content__tab">
                            <CurrentFriends />
                        </div>
                    </div>
                    <div className="friends-page__filter">
                        <FriendsFilter />
                    </div>
                </Route>
                <Route path={`${path}/search`}>
                    <div className="friends-page__content">
                        {renderLinks()}
                        <div className="friends-page__content__tab">
                            <SearchUsers />
                        </div>
                    </div>
                    <div className="friends-page__filter">
                        <StrangersFilter />
                    </div>
                </Route>
                <Route path={`${path}/requests`}>
                    <div className="friends-page__content">
                        {renderLinks()}
                        <div className="friends-page__content__tab">
                            <FriendRequests />
                        </div>
                    </div>
                    <div className="friends-page__filter">
                        <StrangersFilter />
                    </div>
                </Route>
                <Redirect to={`${path}/current`} />
            </Switch>
        </div>
    );
};
