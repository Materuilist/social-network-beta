import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "reactstrap";

import MagnifierIMG from "images/magnifier.svg";

import "./custom-search.scss";

export const CustomSearch = ({
    options,
    searchField = "name",
    onChange = () => {},
    onSearchTextChange = () => {},
    placeholder = "Поиск",
    delay = 700,
    defaultSearchText = "",
}) => {
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchText, setSearchText] = useState(defaultSearchText);

    const isFirstTimeRef = useRef(true);

    const filteredOptions = useMemo(() => {
        if (!options || !options.length) return [];

        return options.filter((option) =>
            option[searchField].toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText, options]);

    useEffect(() => {
        if (isFirstTimeRef.current) {
            isFirstTimeRef.current = false;
            return;
        }

        clearTimeout(searchTimeout);
        setSearchTimeout(
            setTimeout(() => {
                onSearchTextChange(searchText);
                onChange(filteredOptions);
            }, delay)
        );
    }, [searchText]);

    useEffect(() => {
        onChange(filteredOptions);
    }, [options]);

    return (
        <div className="custom-search">
            <Input
                type="text"
                onChange={({ target: { value } }) => setSearchText(value)}
                placeholder={placeholder}
                defaultValue={defaultSearchText}
            />
            <img src={MagnifierIMG} />
        </div>
    );
};
