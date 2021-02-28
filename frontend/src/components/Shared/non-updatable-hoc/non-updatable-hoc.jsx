import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const NonUpdatableHOC = ({ children }) => {
    const query = useLocation().search;
    const [isMounted, setIsMounted] = useState(false);
    const isFirstRenderRef = useRef(true);

    useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            setIsMounted(true);
            return;
        }
        setIsMounted(false);
        setTimeout(() => {
            setIsMounted(true);
        });
    }, [query]);

    return isMounted ? children : null;
};
