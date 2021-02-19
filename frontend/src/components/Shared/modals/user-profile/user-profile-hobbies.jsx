import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { otherUserProfileModalActions } from "../../../../store/actions";

const mapStateToProps = ({ otherUserProfileModal: { userId, hobbies } }) => ({
    userId,
    hobbies,
});

const mapDispatchToProps = (dispatch) => ({
    otherUserProfileModalActions: bindActionCreators(
        otherUserProfileModalActions,
        dispatch
    ),
});

export const UserProfileHobbies = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ userId, hobbies, otherUserProfileModalActions }) => {
    return <div>{JSON.stringify(hobbies)}</div>;
});
