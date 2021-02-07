import React, { useRef } from "react";
import concatClasses from "classnames";

import "./custom-radiobutton.scss";

export const CustomRadioButton = ({
    name,
    value,
    onChange,
    labelText,
    checked,
    defaultChecked,
    className,
}) => {
    const inputRef = useRef();

    return (
        <div
            className={concatClasses("custom-rbn", className)}
            onClick={() => inputRef.current.click()}
        >
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                defaultChecked={defaultChecked}
                ref={inputRef}
            />
            {labelText && <label>{labelText}</label>}
        </div>
    );
};
