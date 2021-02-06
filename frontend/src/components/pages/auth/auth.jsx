import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "reactstrap";
import { bindActionCreators } from "redux";

import { authActions, notificationsActions } from "../../../store/actions";
import { Loader } from "../../shared/loader/loader";

import classNames from "./auth.module.scss";

const mapDispatchToProps = (dispatch) => ({
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
});

export const Auth = connect(
    null,
    mapDispatchToProps
)(({ notificationsActions, authActions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const submit = (event) => {
        event.preventDefault();
        const {
            target: { login, password },
        } = event;

        setIsLoading(true);
        authActions[isLogin ? "login" : "register"](
            login.value,
            password.value,
            () => setIsLoading(false)
        );
    };

    return (
        <div className={classNames.authPage}>
            <Form className={classNames.authForm} onSubmit={submit}>
                <Loader isLoading={isLoading} />
                <Input
                    name="login"
                    required={true}
                    placeholder="Логин"
                    type="text"
                />
                <Input
                    name="password"
                    required={true}
                    placeholder="Пароль"
                    type="password"
                />
                <p className={classNames.resetPassword}>Сбросить пароль</p>
                <Button type="submit" className="dark">
                    {isLogin ? "Вход" : "Регистрация"}
                </Button>
                <p className="text-center" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Регистрация" : "Вход"}
                </p>
            </Form>
        </div>
    );
});
