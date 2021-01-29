import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Profile } from "./profile/profile";
import { Friends } from "./friends/friends";
import { Notifications } from "../shared/notifications/notifications";

export const Layout = () => {
    return (
        <>
            <Switch>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/friends">
                    <Friends />
                </Route>
                <Redirect to="/profile" />
            </Switch>
            <Notifications />
        </>
    );
};
