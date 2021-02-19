import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { otherUserProfileModalActions } from "../../../../store/actions";

const mapStateToProps = ({
    otherUserProfileModal: { userId, info },
}) => ({
    userId,
    info,
});

const mapDispatchToProps = (dispatch) => ({
    otherUserProfileModalActions: bindActionCreators(
        otherUserProfileModalActions,
        dispatch
    ),
});

export const UserProfileInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ userId, info, otherUserProfileModalActions }) => {
    return <div>{JSON.stringify(info)}</div>;
});
