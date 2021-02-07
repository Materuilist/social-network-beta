import React from "react";
import { Input } from "reactstrap";

export const CustomSearch = ({
    options,
    searchField = "name",
    onChange,
    placeholder = "Поиск",
}) => {
    const DELAY = 700;
    let searchTimeout;

    const search = (searchText) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const filteredOptions = options.filter((option) =>
                option[searchField].includes(searchText)
            );
            onChange(filteredOptions);
        }, DELAY);
    };

    return (
        <>
            <Input
                type="text"
                onChange={({ target: { value } }) => search(value)}
                placeholder={placeholder}
            />
        </>
    );
};
