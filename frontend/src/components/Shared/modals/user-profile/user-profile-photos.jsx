import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        otherUserProfileModalActions.getPhotos(() => setIsLoading(false));
    }, [userId]);

    return (
        <div className="other-user-profile__photos-tab">
            <CustomLoader
                isLoading={isLoading}
                isBackdropVisible={false}
                isLight={false}
            />
            <div className="photos-tab__carousel-container">
                {photos.length ? (
                    <CustomCarousel
                        visibleCount={2}
                        items={photos.map(
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
