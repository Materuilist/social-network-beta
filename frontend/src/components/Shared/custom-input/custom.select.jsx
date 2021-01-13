import React, { useState } from "react";
import {
    DropdownItem,
    DropdownMenu,
    Dropdown,
    DropdownToggle,
} from "reactstrap";

import { Search } from "../search/search";

import classNames from "./custom.input.module.scss";

export const CustomSelect = ({
    value,
    options,
    onChange,
    valueField = "id",
    textField = "name",
    renderOption,
    multiple = false,
}) => {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOpen, setIsOpen] = useState(false);

    const checkIfSelected = (item) =>
        Boolean(value) &&
        (multiple
            ? value.find((val) => val[valueField] === item[valueField])
            : value[valueField] === item[valueField]);

    const renderOptionDefault = (option) => {
        return (
            <div style={checkIfSelected(option) ? { color: "green" } : null}>
                {option[textField]}
            </div>
        );
    };

    const changeHandler = (selectedItem) => {
        if (!multiple) {
            if (value && value[valueField] === selectedItem[valueField]) {
                return onChange(null);
            } else {
                return onChange(selectedItem);
            }
        } else {
            return onChange(
                // кликнутая опция была выбрана
                value.find(
                    (item) => item[valueField] === selectedItem[valueField]
                )
                    ? value.filter(
                          (item) =>
                              item[valueField] !== selectedItem[valueField]
                      )
                    : [...value, selectedItem]
            );
        }
    };

    const renderDropdownItem = (option) => (
        <DropdownItem
            key={option[valueField]}
            onClick={() => changeHandler(option)}
        >
            {renderOptionDefault(option)}
        </DropdownItem>
    );

    return (
        <div className={classNames.customSelect}>
            <Dropdown
                isOpen={isOpen}
                toggle={() => setIsOpen((prevState) => !prevState)}
            >
                <DropdownToggle>
                    <Search
                        options={options}
                        filterBy={textField}
                        onChange={(searchText, newOptions) =>
                            setFilteredOptions(newOptions)
                        }
                        placeholder={
                            !value || value.length === 0
                                ? "Поиск"
                                : multiple
                                ? `Выбрано ${value.length} вариантов`
                                : value[textField]
                        }
                    />
                </DropdownToggle>
                <DropdownMenu style={{ maxHeight: "200px", overflow: "auto" }}>
                    {!value || value.length === 0
                        ? null
                        : multiple
                        ? value.map((option) => renderDropdownItem(option))
                        : [value].map((option) => renderDropdownItem(option))}
                    {filteredOptions
                        .filter((option) =>
                            !value || value.length === 0
                                ? true
                                : multiple
                                ? !value.find(
                                      (selectedItem) =>
                                          selectedItem[valueField] ===
                                          option[valueField]
                                  )
                                : option[valueField] !== value[valueField]
                        )
                        .map((option) => renderDropdownItem(option))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};
