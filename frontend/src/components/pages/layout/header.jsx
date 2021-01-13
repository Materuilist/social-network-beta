import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";

import Logo from "../../../static/images/logo.png";
import classNames from "./layout.module.scss";

export const Header = () => {
    const history = useHistory();

    return (
        <Navbar className={classNames.header}>
            <NavbarBrand onClick={() => history.push("/")}>
                <img src={Logo} />
            </NavbarBrand>
        </Navbar>
    );
};
