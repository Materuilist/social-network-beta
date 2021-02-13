import React, { useState } from "react";
import concatClasses from "classnames";

import ArrowIMG from "images/flat-arrow.svg";

import "./custom-carousel.scss";

export const CustomCarousel = ({ items = [], visibleCount = 4 }) => {
    const [page, setPage] = useState(0);

    const previousPageExists = page !== 0;
    const nextPageExists = page + visibleCount < items.length;

    return (
        <div className="custom-carousel">
            <div
                className={concatClasses("custom-carousel__arrow backward", {
                    forbidden: !previousPageExists,
                })}
            >
                <img
                    src={ArrowIMG}
                    onClick={
                        previousPageExists ? () => setPage(page - 1) : null
                    }
                />
            </div>
            <div className="custom-carousel__items-container">
                {items.map(({ key, render, isFixed }, index) => (
                    <div
                        key={key ?? index}
                        className={concatClasses("custom-carousel__item", {
                            fixed: isFixed,
                        })}
                        style={{
                            flex: `0 0 ${100 / visibleCount}%`,
                            transform: `translateX(${-page * 100}%)`,
                        }}
                    >
                        {render && typeof render === "function" && render()}
                    </div>
                ))}
            </div>
            <div
                className={concatClasses("custom-carousel__arrow front", {
                    forbidden: !nextPageExists,
                })}
            >
                <img
                    src={ArrowIMG}
                    onClick={nextPageExists ? () => setPage(page + 1) : null}
                />
            </div>
        </div>
    );
};
