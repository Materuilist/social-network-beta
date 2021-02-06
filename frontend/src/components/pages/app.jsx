import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { CheckUser } from "./check-user";
import { Layout } from "./layout";
import { Auth } from "./auth/auth";
import { Notifications } from "../shared/notifications/notifications";

export const App = () => {
    return (
        <>
            <CheckUser
                renderLayout={() => <Layout />}
                renderAuth={() => (
                    <Switch>
                        <Route path="/auth">
                            <Auth />
                        </Route>
                        <Redirect to="/auth" />
                    </Switch>
                )}
            />
            <Notifications />
        </>
    );
};
