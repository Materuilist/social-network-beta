import React, { useEffect, useMemo, useState } from "react";
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
import CrossIMG from "images/cross.svg";

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
    onToggle,
    onCheckAll,
    onDismissAll,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchedOptions, setSearchedOptions] = useState(options);

    const selectedOptions = useMemo(() => {
        if (!value || (multiple && !(value && value.length))) return [];

        return multiple
            ? options.filter((option) =>
                  value.find(
                      (selectedOption) => selectedOption === option[valueField]
                  )
              )
            : [options.find((option) => option[valueField] === value)];
    }, [options, value]);

    const notSelectedOptions = useMemo(() => {
        if (!selectedOptions.length) return options;

        return options.filter(
            (option) =>
                !selectedOptions.find(
                    (selectedOption) =>
                        selectedOption[valueField] === option[valueField]
                )
        );
    }, [selectedOptions]);

    const toggleDropdown = () => {
        onToggle && onToggle(!isOpen);
        setIsOpen(!isOpen);
    };

    const checkAll = (event) => {
        event.stopPropagation()
        onChange(options.map((option) => option[valueField]));
        onCheckAll && typeof onCheckAll === "function" && onCheckAll();
    };

    const dismissAll = (event) => {
        event.stopPropagation()
        onChange(multiple ? [] : null);
        onDismissAll && typeof onDismissAll === "function" && onDismissAll();
    };

    const onSearch = (newOptions) => {
        setSearchedOptions(newOptions);
    };

    const clickOption = (event, optionVal, isSelected) => {
        event.preventDefault();

        onChange &&
            onChange(
                multiple
                    ? isSelected
                        ? value.filter((val) => val !== optionVal)
                        : value && value.length
                        ? [...value, optionVal]
                        : [optionVal]
                    : isSelected
                    ? null
                    : optionVal
            );
    };

    const renderOption = (option, isSelected = false) => {
        const optionVal = option[valueField];

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
                {selectedOptions.map((option) => renderOption(option, true))}
                {searchedOptions.map((option) => renderOption(option, false))}
            </div>
        );
    };

    return (
        <Dropdown
            className="custom-select-with-search"
            isOpen={isOpen}
            toggle={toggleDropdown}
        >
            <CustomLoader isLoading={busy} size={36} />
            {busy || !options || !options.length ? null : (
                <>
                    <DropdownToggle>
                        <div className="custom-dropdown__preview-container">
                            <span>
                                {selectedOptions.length
                                    ? selectedOptions.length > 1
                                        ? `Выбрано ${value.length} элементов`
                                        : selectedOptions[0][textField]
                                    : placeholder}
                            </span>
                            <div>
                                {selectedOptions.length ? (
                                    <img
                                        src={CrossIMG}
                                        title="Сбросить выбор"
                                        onClick={dismissAll}
                                    />
                                ) : (
                                    <>
                                        {multiple && (
                                            <img
                                                src={TickIMG}
                                                title="Выбрать все"
                                                onClick={checkAll}
                                            />
                                        )}
                                    </>
                                )}
                                <img className="toggle-icon" src={TogglerIMG} />
                            </div>
                        </div>
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
                                    options={notSelectedOptions}
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
