import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Profile } from "./profile/profile";
import { Friends } from "./friends/friends";
import { ChatList } from "./chat-list/chat-list";
import { Chat } from "./chat/chat";
import { Header } from "./header";
import { SideNav } from "./side-nav";
import { UserProfileModal } from "../shared/modals/user-profile/user-profile";
import { NonUpdatableHOC } from "../shared/non-updatable-hoc/non-updatable-hoc";

import "./layout.scss";

export const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <div className="content">
                <SideNav />
                <main>
                    <Switch>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/friends">
                            <Friends />
                        </Route>
                        <Route path="/chat-list">
                            <ChatList />
                        </Route>
                        <Route path="/chat">
                            {/* избавиться от этого костыля */}
                            <NonUpdatableHOC>
                                <Chat />
                            </NonUpdatableHOC>
                        </Route>
                        <Redirect to="/profile" />
                    </Switch>
                </main>
            </div>
            <UserProfileModal />
        </div>
    );
};
