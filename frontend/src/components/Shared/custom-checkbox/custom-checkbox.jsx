import React, { useRef } from "react";
import concatClasses from "classnames";

import "./custom-checkbox.scss";

export const CustomCheckbox = ({
    name,
    value,
    onChange = () => {},
    checked,
    defaultChecked,
    className,
}) => {
    const inputRef = useRef();

    return (
        <div
            className={concatClasses("custom-checkbox", className)}
            // onClick={() => inputRef.current.click()}
        >
            <input
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                defaultChecked={defaultChecked}
                ref={inputRef}
                onChange={() => onChange(value)}
            />
            {/* {labelText && <label>{labelText}</label>} */}
        </div>
    );
};
