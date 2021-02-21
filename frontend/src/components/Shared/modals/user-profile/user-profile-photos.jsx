import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { otherUserProfileModalActions } from "../../../../store/actions";
import { CustomLoader } from "../../custom-loader/custom-loader";
import { CustomCarousel } from "../../custom-carousel/custom-carousel";

import LikeFilledIMG from "images/like-filled.svg";
import LikeIMG from "images/like.svg";

const mapStateToProps = ({ otherUserProfileModal: { userId, photos } }) => ({
    userId,
    photos,
});

const mapDispatchToProps = (dispatch) => ({
    otherUserProfileModalActions: bindActionCreators(
        otherUserProfileModalActions,
        dispatch
    ),
});

export const UserProfilePhotos = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ userId, photos, otherUserProfileModalActions }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [photosState, setPhotosState] = useState([]);
    //чтобы при демонтировании компонента эффект видел актуальные пропс и состояние фото
    const photosRef = useRef([]);
    const photosStateRef = useRef([]);

    useEffect(() => {
        otherUserProfileModalActions.getPhotos(() => setIsLoading(false));
    }, [userId]);

    useEffect(() => {
        setPhotosState(photos);
        photosRef.current = photos;
    }, [photos]);

    useEffect(() => {
        photosStateRef.current = photosState;
    }, [photosState]);

    useEffect(
        () =>
            function updateDatabaseLikes() {
                console.log({ photosRef, photosStateRef });
                const photosWithLikeChanged = photosStateRef.current
                    .filter(({ _id, hasCurrentUserLike }) =>
                        photosRef.current.find(
                            (databasePhoto) =>
                                databasePhoto._id === _id &&
                                databasePhoto.hasCurrentUserLike !==
                                    hasCurrentUserLike
                        )
                    )
                    .map(({ _id }) => _id);
                if (photosWithLikeChanged.length) {
                    otherUserProfileModalActions.togglePhotosLikes(
                        userId,
                        photosWithLikeChanged
                    );
                }
            },
        []
    );

    const togglePhotoLike = (photoId) => {
        setPhotosState(
            photosState.map((photo) =>
                photo._id === photoId
                    ? {
                          ...photo,
                          likesCount: photo.hasCurrentUserLike
                              ? photo.likesCount - 1
                              : photo.likesCount + 1,
                          hasCurrentUserLike: !photo.hasCurrentUserLike,
                      }
                    : photo
            )
        );
    };

    return (
        <div className="other-user-profile__photos-tab">
            <CustomLoader
                isLoading={isLoading}
                isBackdropVisible={false}
                isLight={false}
            />
            <div className="photos-tab__carousel-container">
                {photosState.length ? (
                    <CustomCarousel
                        visibleCount={2}
                        items={photosState.map(
                            ({
                                _id,
                                data,
                                likesCount,
                                hasCurrentUserLike,
                            }) => ({
                                key: _id,
                                render: () => (
                                    <div className="image-container">
                                        <img src={data} />
                                        <div>
                                            <img
                                                src={
                                                    hasCurrentUserLike
                                                        ? LikeFilledIMG
                                                        : LikeIMG
                                                }
                                                title={
                                                    hasCurrentUserLike
                                                        ? "Снять лайк"
                                                        : "Поставить лайк"
                                                }
                                                onClick={() =>
                                                    togglePhotoLike(_id)
                                                }
                                            />
                                            <span>{likesCount}</span>
                                        </div>
                                    </div>
                                ),
                            })
                        )}
                    />
                ) : (
                    <p>У пользователя нет фото</p>
                )}
            </div>
        </div>
    );
});
