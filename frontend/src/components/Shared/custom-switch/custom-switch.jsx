import React, { useRef } from "react";
import concatClasses from "classnames";

import "./custom-switch.scss";

export const CustomSwitch = ({
    name,
    value,
    onChange,
    labelText,
    checked,
    defaultChecked,
    className,
}) => {
    return (
        <div
            className={concatClasses("custom-switch-button", className, {
                switchedOn: checked,
            })}
            onClick={() => onChange(!checked)}
        >
            {labelText && <label>{labelText}</label>}
            <div></div>
        </div>
    );
};
