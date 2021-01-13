import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

export const CustomRadiobutton = ({ checked, label, onChange, name }) => {
    return (
        <FormGroup check>
            <Label check>
                <Input
                    type="radio"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                />
                {label}
            </Label>
        </FormGroup>
    );
};
