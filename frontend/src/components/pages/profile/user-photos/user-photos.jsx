import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { CustomLoader } from "../../../shared/custom-loader/custom-loader";
import { CustomCarousel } from "../../../shared/custom-carousel/custom-carousel";
import { photosActions } from "../../../../store/actions";

import GridIMG from "images/grid.svg";
import GridaActiveIMG from "images/grid-active.svg";
import CarouselIMG from "images/carousel.svg";
import CarouselActiveIMG from "images/carousel-active.svg";
import UploadIMG from "images/upload.svg";

import classNames from "./user-photos.module.scss";

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

    useEffect(() => {
        photosActions.getPhotos(() => setIsLoading(false));
    }, []);

    const photoItems = [
        {
            render: () => (
                <div>
                    <img src={UploadIMG} />
                </div>
            ),
            isFixed: true,
        },
        {
            render: () => <img src={GridIMG} />,
        },
        {
            render: () => <img src={GridaActiveIMG} />,
        },
        {
            render: () => <img src={CarouselIMG} />,
        },
        {
            render: () => <img src={CarouselActiveIMG} />,
        },
    ];

    return (
        <div className={classNames.userPhotos}>
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
                {isCarouselMode ? <CustomCarousel items={photoItems} /> : null}
            </div>
        </div>
    );
});
