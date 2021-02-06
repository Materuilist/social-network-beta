import React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { store } from "../../store";
import { authActions } from "actions";

import LogoIMG from "images/logo.svg";
import defaultAvatarIMG from "images/default-avatar.svg";
import SignOutIMG from "images/sign-out.svg";

const mapStateToProps = ({ userInfo }) => ({
    avatar: userInfo.avatar,
    login: userInfo.login,
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
});

export const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ avatar, login, authActions }) => {
    return (
        <div className="header">
            <div>
                <img src={LogoIMG} onClick={() => store.dispatch(push("/profile"))} />
                <div>
                    <img
                        src={avatar || defaultAvatarIMG}
                        onClick={() => store.dispatch(push("/profile"))}
                    />
                    <span onClick={() => store.dispatch(push("/profile"))}>
                        {login}
                    </span>
                    <img src={SignOutIMG} onClick={authActions.signOut} />
                </div>
            </div>
        </div>
    );
});
