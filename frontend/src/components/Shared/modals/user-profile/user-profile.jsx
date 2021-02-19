import React from "react";
import { connect } from "react-redux";

import { calcRem } from "../../../../helpers";
import { CustomModal } from "../../custom-modal/custom-modal";

import CrossIMG from "images/cross.svg";

import "./user-profile.scss";
import { bindActionCreators } from "redux";
import { otherUserProfileModalActions } from "../../../../store/actions";

const mapStateToProps = ({
    otherUserProfileModal: { show, userId, info, photos, hobbies },
}) => ({
    show,
    userId,
    info,
    photos,
    hobbies,
});

const mapDispatchToProps = (dispatch) => ({
    otherUserProfileModalActions: bindActionCreators(
        otherUserProfileModalActions,
        dispatch
    ),
});

export const UserProfileModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ show, userId, info, photos, hobbies, otherUserProfileModalActions }) => {
    return (
        <CustomModal
            isOpen={show}
            height={calcRem(400)}
            width={calcRem(685)}
            className="user-profile-modal"
            crossIcon={CrossIMG}
            onClosed={otherUserProfileModalActions.close}
        ></CustomModal>
    );
});
