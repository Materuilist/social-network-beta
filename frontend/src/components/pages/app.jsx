import React from "react";

import Layout from "./layout/layout";
import CheckUser from "./check.user";

// import classNames from "./app.module.scss";

export const App = () => {
    return (
        <CheckUser>
            <Layout />
        </CheckUser>
    );
};
