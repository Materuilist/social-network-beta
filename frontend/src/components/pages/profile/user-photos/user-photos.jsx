import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { CustomLoader } from "../../../shared/custom-loader/custom-loader";
import { CustomCarousel } from "../../../shared/custom-carousel/custom-carousel";
import { photosActions } from "../../../../store/actions";
import { getFileBinary } from "../../../../helpers";

import GridIMG from "images/grid.svg";
import GridaActiveIMG from "images/grid-active.svg";
import CarouselIMG from "images/carousel.svg";
import CarouselActiveIMG from "images/carousel-active.svg";
import UploadIMG from "images/upload.svg";
import LikeFilledIMG from "images/like-filled.svg";
import GarbageIMG from "images/garbage.svg";

import classNames from "./user-photos.module.scss";
import { PhotosModal } from "../../../shared/modals/photos-modal/photos.modal";

const mapStateToProps = ({ photos }) => ({
    photos,
});

const mapDispatchToProps = (dispatch) => ({
    photosActions: bindActionCreators(photosActions, dispatch),
});

export const UserPhotos = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ photos, photosActions }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isCarouselMode, setIsCarouselMode] = useState(true);

    const photoInputRef = useRef();

    useEffect(() => {
        photosActions.getPhotos(() => setIsLoading(false));
    }, []);

    const deletePhoto = (photoId) => {
        if (!photoId) return;
        setIsLoading(true);
        photosActions.deletePhotos([photoId], () => setIsLoading(false));
    };

    const uploadPhotos = (event) => {
        const {
            target: { files },
        } = event;

        if (files.length === 0) return;

        setIsLoading(true);
        Promise.all([...files].map(getFileBinary)).then((photosEncoded) =>
            photosActions.addPhotos(photosEncoded, () => setIsLoading(false))
        );
    };

    const photoItems = [
        {
            render: () => (
                <div className={classNames.uploadPhoto}>
                    <img
                        src={UploadIMG}
                        onClick={() => photoInputRef.current.click()}
                    />
                </div>
            ),
            isFixed: true,
            key: "upload",
        },
        ...photos.data.map(({ data, id, likesCount }) => ({
            render: () => (
                <div className={classNames.singlePhotoContainer}>
                    <img src={data} />
                    <div
                        className={classNames.likesContainer}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <span>{likesCount}</span>
                        <img src={LikeFilledIMG} />
                    </div>
                    <div className={classNames.garbageIcon}>
                        <img
                            src={GarbageIMG}
                            onClick={(event) => {
                                event.stopPropagation();
                                deletePhoto(id);
                            }}
                        />
                    </div>
                </div>
            ),
            key: id,
        })),
    ];

    return (
        <div className={classNames.userPhotos}>
            <input
                hidden
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onInput={uploadPhotos}
                multiple
            />
            <CustomLoader isLoading={isLoading} />
            <div className={classNames.modesContainer}>
                <img
                    src={isCarouselMode ? GridIMG : GridaActiveIMG}
                    onClick={() => setIsCarouselMode(!isCarouselMode)}
                    title="Режим сетки"
                />
                <img
                    src={isCarouselMode ? CarouselActiveIMG : CarouselIMG}
                    onClick={() => setIsCarouselMode(!isCarouselMode)}
                    title="Режим карусели"
                />
            </div>
            <div className={classNames.photosContainer}>
                <CustomCarousel items={photoItems} visibleCount={5} />
                {!isCarouselMode && (
                    <PhotosModal
                        isOpen={!isCarouselMode}
                        photos={photoItems}
                        onClosed={() => setIsCarouselMode(true)}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
});
