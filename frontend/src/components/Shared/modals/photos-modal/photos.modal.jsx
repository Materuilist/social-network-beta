import React from "react";

import { CustomModal } from "../../custom-modal/custom-modal";

import "./photos.modal.scss";

export const PhotosModal = ({
    photos = [],
    renderHeaderBtns,
    isOpen,
    onClosed,
    isLoading = false,
}) => {
    return (
        <CustomModal
            isLoading={isLoading}
            isOpen={isOpen}
            onClosed={onClosed}
            vh={80}
            vw={70}
        >
            <div className="photos-grid">
                {photos.map(({ render, key }, index) => (
                    <div key={key ?? index} className="photos-grid__item">
                        {render()}
                    </div>
                ))}
            </div>
        </CustomModal>
    );
};
