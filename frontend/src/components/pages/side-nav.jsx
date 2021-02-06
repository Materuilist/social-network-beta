import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const mapStateToProps = ({ userInfo }) => ({
    userInfo,
});

export const SideNav = connect(mapStateToProps)(({ userInfo }) => {
    const renderChatNavItem = () => {
        return (
            <>
                <NavLink to="/chat">Чат</NavLink>
                <div className='brief-statistics-row'>Здесь будет краткая инфа</div>
            </>
        );
    };

    const renderFriendsNavItem = () => {
        return (
            <>
                <NavLink to="/friends" >Друзья</NavLink>
                <div className='brief-statistics-row'>Здесь будет краткая инфа</div>
            </>
        );
    };

    const renderProfileNavItem = () => {
        return (
            <>
                <NavLink to="/profile" >Профиль</NavLink>
                <div className='brief-statistics-row'>Здесь будет краткая инфа</div>
            </>
        );
    };

    return <div className="side-nav">
        {renderProfileNavItem()}
        {renderFriendsNavItem()}
        {renderChatNavItem()}
    </div>;
});
