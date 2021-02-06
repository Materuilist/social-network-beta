import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Profile } from "./profile/profile";
import { Friends } from "./friends/friends";
import { Chat } from "./chat/chat";
import { Header } from "./header";

import "./layout.scss";
import { SideNav } from "./side-nav";

export const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <div className="content">
                <SideNav />
                <Switch>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/friends">
                        <Friends />
                    </Route>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                    <Redirect to="/profile" />
                </Switch>
            </div>
        </div>
    );
};
