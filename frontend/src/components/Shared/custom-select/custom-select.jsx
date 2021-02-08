import React, { useEffect, useState } from "react";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import concatClasses from "classnames";

import { CustomLoader } from "../custom-loader/custom-loader";
import { CustomSearch } from "../custom-search/custom-search";
import { calcRem } from "../../../helpers";

import TogglerIMG from "images/toggler-filled.svg";
import TickIMG from "images/tick.svg";

import "./custom-select.scss";

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

    const clickOption = (event, optionVal, isSelected) => {
        event.preventDefault();

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
        const optionVal = option[valueField];
        const isSelected =
            value || (value && value.length && value.length > 0)
                ? multiple
                    ? value.find((val) => val === optionVal)
                    : value === optionVal
                : false;

        return (
            <DropdownItem
                toggle={false}
                key={optionVal}
                onClick={(event) => clickOption(event, optionVal, isSelected)}
            >
                {option[textField]}
                {isSelected && <img className="tick-pic" src={TickIMG} />}
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
            {busy ||
            !options ||
            !options.length ||
            options.length === 0 ? null : (
                <>
                    <DropdownToggle>
                        {multiple
                            ? value.length === 0
                                ? placeholder
                                : `Выбрано ${value.length} элементов`
                            : (options.find(
                                  (option) => option[valueField] === value
                              ) &&
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
                </>
            )}
        </Dropdown>
    );
};
