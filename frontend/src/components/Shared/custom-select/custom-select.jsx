import React, { useEffect, useState } from "react";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";

import { CustomLoader } from "../custom-loader/custom-loader";
import { CustomSearch } from "../custom-search/custom-search";

import TogglerIMG from "images/toggler-filled.svg";

import "./custom-select.scss";
import { calcRem } from "../../../helpers";

export const CustomSelect = ({
    multiple = false,
    search = true,
    value,
    onChange,
    options,
    valueField = "id",
    textField = "name",
    placeholder = "Выбрать",
    busy = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchedOptions, setSearchedOptions] = useState(options);

    useEffect(() => {
        const notSelectedOptions =
            value || (value && value.length && value.length > 0)
                ? options.filter((option) =>
                      multiple
                          ? !value.find((val) => val === option[valueField])
                          : option[valueField] !== value
                  )
                : options;
        setSearchedOptions(notSelectedOptions);
    }, [value, options]);

    const onSearch = (newOptions) => {
        setSearchedOptions(newOptions);
    };

    const clickOption = (event, optionVal) => {
        event.preventDefault();
        const isSelected =
            value || (value && value.length && value.length > 0)
                ? multiple
                    ? value.find((val) => val === optionVal)
                    : value === optionVal
                : false;

        onChange(
            multiple
                ? isSelected
                    ? value.filter((val) => val !== optionVal)
                    : [...value, optionVal]
                : isSelected
                ? null
                : optionVal
        );
    };

    const renderOption = (option) => {
        return (
            <DropdownItem
                toggle={false}
                key={option[valueField]}
                onClick={(event) => clickOption(event, option[valueField])}
            >
                {option[textField]}
            </DropdownItem>
        );
    };

    const renderOptionsList = () => {
        return (
            <div className="options-container">
                {(value || (value && value.length && value.length > 0)) &&
                    (multiple
                        ? value.map((val) =>
                              renderOption(
                                  options.find(
                                      (option) => option[valueField] === val
                                  )
                              )
                          )
                        : renderOption(
                              options.find(
                                  (option) => option[valueField] === value
                              )
                          ))}
                {searchedOptions.map((option) => renderOption(option))}
            </div>
        );
    };

    return (
        <Dropdown
            className="custom-select-with-search"
            isOpen={isOpen}
            toggle={() => setIsOpen(!isOpen)}
        >
            <CustomLoader isLoading={busy} size={36} />
            {/* <img className="toggle-icon" src={TogglerIMG} /> */}
            <DropdownToggle>
                {multiple
                    ? value.length === 0
                        ? placeholder
                        : `Выбрано ${value.length} элементов`
                    : (options.find((option) => option[valueField] === value) &&
                          options.find(
                              (option) => option[valueField] === value
                          )[textField]) ||
                      placeholder}
            </DropdownToggle>
            <DropdownMenu
                positionFixed
                modifiers={{
                    setMaxHeight: {
                        enabled: true,
                        order: 890,
                        fn: (data) => {
                            return {
                                ...data,
                                styles: {
                                    ...data.styles,
                                    overflow: "hidden",
                                    height: calcRem(200),
                                },
                            };
                        },
                    },
                }}
            >
                {search && (
                    <div className="search-container">
                        <CustomSearch
                            options={options}
                            searchField={textField}
                            onChange={onSearch}
                        />
                    </div>
                )}
                {renderOptionsList()}
            </DropdownMenu>
        </Dropdown>
    );
};
