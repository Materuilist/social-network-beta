import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Input } from "reactstrap";
import { bindActionCreators } from "redux";

import { notificationsActions } from "../../../store/actions";

import classNames from "./auth.module.scss";

const mapDispatchToProps = (dispatch) => ({
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
});

export const Auth = connect(
    null,
    mapDispatchToProps
)(({ notificationsActions }) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className={classNames.authPage}>
            <div className={classNames.authForm}>
                <Input value="Бубблс" type="text" />
                <Input value="Пароль" type="password" />
                <p className={classNames.resetPassword}>Сбросить пароль</p>
                <Button
                    className="dark"
                    onClick={() =>
                        notificationsActions.notifyError(
                            "opadsdasdsadasdsadsadadadasdad",
                            "Стоящий у доски Петухов задумчиво посмотрел на концы своих ботинок и почесал нос. Ученики в классе от скуки начали тихо шушукаться. Уже пару минут Петухов молчал как партизан. Учительница биологии и классная руководительница восьмого Б Агнесса Ивановна прервала тишину:"
                        )
                    }
                >
                    {isLogin ? "Вход" : "Регистрация"}
                </Button>
                <p className="text-center" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Регистрация" : "Вход"}
                </p>
            </div>
        </div>
    );
});
