import React, { useState } from "react";

import { CustomModal } from "../../custom-modal/custom-modal";

import ReturnArrowIMG from "images/curvy-back-arrow.svg";

import "./photos.modal.scss";

export const PhotosModal = ({
    photos = [],
    renderHeaderBtns,
    isOpen,
    onClosed,
    isLoading = false,
}) => {
    const [solelyShownPhoto, setSolelyShownPhoto] = useState(null);

    const renderBackToGridButton = () => {
        if (!solelyShownPhoto) return null;

        return (
            <img
                src={ReturnArrowIMG}
                onClick={() => setSolelyShownPhoto(null)}
            />
        );
    };

    return (
        <CustomModal
            isLoading={isLoading}
            isOpen={isOpen}
            onClosed={onClosed}
            renderHeaderBtns={renderBackToGridButton}
            height='80vh'
            width='70vw'
        >
            <div className="photos-grid">
                {solelyShownPhoto ? (
                    <div className="photos-grid__solo-photo">
                        {solelyShownPhoto.render()}
                    </div>
                ) : (
                    photos.map((photo, index) => (
                        <div
                            key={photo.key ?? index}
                            className="photos-grid__item"
                            onClick={() =>
                                !photo.isFixed && setSolelyShownPhoto(photo)
                            }
                        >
                            {photo.render()}
                        </div>
                    ))
                )}
            </div>
        </CustomModal>
    );
};
