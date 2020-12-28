import React from "react";
import { Spinner } from "reactstrap";

import CustomBackdrop from "../custom-backdrop/custom.backdrop";

import classNames from "./loader.module.scss";

export default ({ isVisible }) => {
    return (
        <>
            {isVisible ? (
                <>
                    <CustomBackdrop isVisible={isVisible} />
                    <Spinner
                        className={classNames.loader}
                        style={{ width: "3rem", height: "3rem" }}
                        type="grow"
                    />
                </>
            ) : null}
        </>
    );
};
