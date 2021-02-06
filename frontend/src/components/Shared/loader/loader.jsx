import React from "react";
import RingLoader from "react-spinners/RingLoader";

import { calcRem } from "../../../helpers";

import classNames from "./loader.module.scss";

export const Loader = ({
    isLoading,
    isLight = true,
    size = 150,
    backdropColor = "#000",
}) =>
    isLoading ? (
        <div
            className={classNames.loaderContainer}
            style={{ backgroundColor: backdropColor }}
        >
            <RingLoader
                color={isLight ? "#7fd4bc" : "#5c9a88"}
                loading={isLoading}
                size={calcRem(size)}
            />
        </div>
    ) : null;
