import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { otherUserProfileModalActions } from "../../../../store/actions";

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
    return <div>{JSON.stringify(photos)}</div>;
});
