import React from "react";
import RingLoader from "react-spinners/RingLoader";

import { calcRem } from "../../../helpers";

import "./custom-loader.scss";

export const CustomLoader = ({
    isLoading,
    isLight = true,
    loaderColor,
    opacity = ".3",
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
                opacity,
            }}
        >
            <RingLoader
                color={loaderColor ?? (isLight ? "#7fd4bc" : "#5c9a88")}
                loading={isLoading}
                size={calcRem(size)}
            />
        </div>
    ) : null;
