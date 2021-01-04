import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Profile from "../profile/profile";
import Friends from "../friends/friends";
import Chat from "../chat/chat";
import Auth from "../auth/auth";
import Notifications from "../../Shared/notifications/notifications";
import { Header } from "./header";

import classNames from "./layout.module.scss";
import SideNav from "./side.nav";

const Layout = ({ currentUrl }) => {
    const isAuthed = currentUrl !== "/auth";

    return (
        <>
            {isAuthed && (
                <>
                    <Header />
                </>
            )}
            <div
                className={
                    isAuthed
                        ? classNames.page
                        : [classNames.page, classNames.auth].join(" ")
                }
            >
                <div className={classNames.content}>
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
                        <Route path="/auth">
                            <Auth />
                        </Route>
                        <Redirect to="/profile" />
                    </Switch>
                </div>
                {isAuthed && <SideNav />}
                <Notifications />
            </div>
        </>
    );
};

const mapStateToProps = ({ router }) => ({
    currentUrl: router.location.pathname,
});

export default connect(mapStateToProps)(Layout);
