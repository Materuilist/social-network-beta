import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";

import Profile from "./profile/profile";
import Friends from "./friends/friends";
import Chat from "./chat/chat";
import Auth from "./auth/auth";
import { userInfoActions } from "../../store/actions";
import Notifications from "../Shared/notifications/notifications";

// import classNames from "./app.module.scss";

function App({ userInfo, userInfoActions }) {
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (!userInfo.login && jwt) {
            userInfoActions.getUser();
        }
    }, []);

    return (
        <>
            <Switch>
                {!userInfo.login && !jwt ? (
                    <>
                        <Route key="1" path="/auth">
                            <Auth />
                        </Route>
                        <Redirect path="*" to="/auth" />
                    </>
                ) : (
                    <>
                        <Route key="1" path="/profile">
                            <Profile />
                        </Route>
                        <Route key="2" path="/friends">
                            <Friends />
                        </Route>
                        <Route key="3" path="/chat">
                            <Chat />
                        </Route>
                        <Redirect path="*" to="/profile" />
                    </>
                )}
            </Switch>
            <Notifications />
        </>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
