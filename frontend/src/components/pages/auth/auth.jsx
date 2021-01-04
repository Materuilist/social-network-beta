import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { bindActionCreators } from "redux";

import { userInfoActions } from "../../../store/actions";
import Loader from "../../Shared/loader/loader";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginMode: true,
            isLoading: false,
        };
    }

    onFormSubmit(event) {
        const { userInfoActions } = this.props;
        const { isLoginMode } = this.state;
        const {
            target: {
                login: { value: loginValue },
                password: { value: passwordValue },
            },
        } = event;

        event.preventDefault();

        this.setState({ isLoading: true });
        const action = isLoginMode ? "login" : "register";
        userInfoActions[action](loginValue, passwordValue).then(() =>
            this.setState({ isLoading: false })
        );
    }

    render() {
        const { userInfo } = this.props;
        const { isLoginMode, isLoading } = this.state;

        return (
            <>
                {userInfo.login && <Redirect to="/" />}
                <div className="h-100 d-flex flex-column justify-content-around poistion-relative">
                    <Loader isVisible={isLoading} />
                    <div>
                        <Col lg={5} md={7} sm={10} xs={12} className="mx-auto">
                            <Form onSubmit={this.onFormSubmit.bind(this)}>
                                <Row form>
                                    <Col xs={10} className="mx-auto">
                                        <FormGroup>
                                            <Label>Логин</Label>
                                            <Input
                                                name="login"
                                                required
                                                type="text"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Пароль</Label>
                                            <Input
                                                name="password"
                                                required
                                                type="password"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button
                                    type="submit"
                                    className="d-block mx-auto"
                                >
                                    {isLoginMode
                                        ? "Войти"
                                        : "Зарегистрироваться"}
                                </Button>
                                <p
                                    onClick={() =>
                                        this.setState({
                                            isLoginMode: !isLoginMode,
                                        })
                                    }
                                    className="text-center text-muted"
                                    style={{
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                    }}
                                >
                                    {isLoginMode
                                        ? "Зарегистрироваться"
                                        : "Войти"}
                                </p>
                            </Form>
                        </Col>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ userInfo }) => ({
    userInfo,
});

const mapDispatchToProps = (dispatch) => ({
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
