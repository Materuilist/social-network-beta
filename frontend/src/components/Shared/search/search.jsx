import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

export const Search = ({
    defaultValue = "",
    onChange,// (searchText, filteredOptions)=>void - срабатывает при изменении текста поиска
    options,
    filterBy,
    onClick,
    onEnter,
    placeholder = 'Поиск'
}) => {
    const [searchText, setSearchText] = useState(defaultValue);

    useEffect(() => {
        onChange(
            searchText,
            options.filter((option) => {
                const optionValue = filterBy ? option[filterBy] : option;
                return String(optionValue)
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
            })
        );
    }, [searchText]);

    return (
        <Input
            value={searchText}
            onChange={({ target: { value } }) => setSearchText(value)}
            onClick={onClick}
            onKeyUp={({ key }) => key === "Enter" && onEnter(searchText)}
            placeholder={placeholder}
        />
    );
};
