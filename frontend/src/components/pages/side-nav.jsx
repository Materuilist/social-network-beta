import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const mapStateToProps = ({ userInfo }) => ({
    userInfo,
});

export const SideNav = connect(mapStateToProps)(({ userInfo }) => {
    const renderChatNavItem = () => {
        return <NavLink to="/chat-list">Чат</NavLink>;
    };

    const renderFriendsNavItem = () => {
        return <NavLink to="/friends">Друзья</NavLink>;
    };

    const renderProfileNavItem = () => {
        return <NavLink to="/profile">Профиль</NavLink>;
    };

    return (
        <div className="side-nav">
            {renderProfileNavItem()}
            {renderFriendsNavItem()}
            {renderChatNavItem()}
        </div>
    );
});
