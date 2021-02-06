import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Profile } from "./profile/profile";
import { Friends } from "./friends/friends";
import { Header } from "./header";

import "./layout.scss";

export const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <div className="content">
                <Switch>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/friends">
                        <Friends />
                    </Route>
                    <Redirect to="/profile" />
                </Switch>
            </div>
        </div>
    );
};
