import React from "react";

import classNames from "./custom.backdrop.module.scss";

export default ({ isVisible }) => {
    return (
        <>{isVisible ? <div className={classNames.backdrop}></div> : null}</>
    );
};
