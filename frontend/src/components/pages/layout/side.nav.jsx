import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../routes";

import classNames from "./layout.module.scss";

export default () => {
    return (
        <div className={classNames.sideNav}>
            {routes.map(({ path, name }, index) => (
                <NavLink to={path} activeClassName={classNames.active}>
                    {name}
                </NavLink>
            ))}
        </div>
    );
};
