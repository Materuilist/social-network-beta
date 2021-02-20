import React from "react";
import RingLoader from "react-spinners/RingLoader";

import { calcRem } from "../../../helpers";

import "./loader.scss";

export const CustomLoader = ({
    isLoading,
    isLight = true,
    size = 150,
    backdropColor = "#000",
    isBackdropVisible = true,
}) =>
    isLoading ? (
        <div
            className="loaderContainer"
            style={{
                backgroundColor: isBackdropVisible
                    ? backdropColor
                    : "transparent",
            }}
        >
            <RingLoader
                color={isLight ? "#7fd4bc" : "#5c9a88"}
                loading={isLoading}
                size={calcRem(size)}
            />
        </div>
    ) : null;
