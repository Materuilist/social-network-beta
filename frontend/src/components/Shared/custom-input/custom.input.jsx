import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

import { CustomRadiobutton } from "./custom.radiobutton";

import classNames from "./custom.input.module.scss";
import { CustomSelect } from "./custom.select";

export const CustomInput = ({
    value,
    onChange,
    type,
    options,
    name,
    disabled,
    hidden,
    label,
    valueField,
    textField,
}) => {
    //обычный инпут - text, number
    const renderCommonInput = () => {
        return <Input value={value} onChange={onChange} />;
    };

    const renderInput = () => {
        switch (type) {
            case "text":
            case "number": {
                return renderCommonInput();
            }
            case "radio": {
                return options.map(
                    ({ value: optionValue, label: optionLabel }) => (
                        <CustomRadiobutton
                            key={optionValue}
                            checked={value === optionValue}
                            label={optionLabel}
                            onChange={() => onChange(optionValue)}
                        />
                    )
                );
            }
            case "select": {
                return (
                    <CustomSelect
                        value={value}
                        options={options}
                        onChange={onChange}
                        valueField={valueField}
                        textField={textField}
                    />
                );
            }
            default: {
                return null;
            }
        }
    };

    return (
        <FormGroup className={classNames.customInput}>
            {label && <Label>{label}</Label>}
            {renderInput()}
        </FormGroup>
    );
};
