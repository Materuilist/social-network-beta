import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { otherUserProfileModalActions } from "../../../../store/actions";
import { CustomLoader } from "../../custom-loader/custom-loader";
import { CustomSwitch } from "../../custom-switch/custom-switch";
import { Hobby } from "../../hobby/hobby";

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
    const [isLoading, setIsLoading] = useState(true);
    const [showMatching, setShowMatching] = useState(false);

    useEffect(() => {
        otherUserProfileModalActions.getInterests(() => setIsLoading(false));
    }, []);

    const filteredHobbies = showMatching
        ? hobbies.filter(({ isMatchingCurrentUser }) => isMatchingCurrentUser)
        : hobbies;

    return (
        <div className="other-user-profile__hobbies-tab">
            <div>
                <span>Только одинаковые увлечения:</span>
                <CustomSwitch
                    checked={showMatching}
                    onChange={() => setShowMatching(!showMatching)}
                />
            </div>
            <div className="hobbies-container">
                {filteredHobbies.map(
                    ({ _id, naming, isMatchingCurrentUser }) => (
                        <Hobby
                            key={_id}
                            text={naming}
                            isMatchingCurrentUser={isMatchingCurrentUser}
                        />
                    )
                )}
            </div>
            {isLoading && (
                <CustomLoader
                    isLoading={isLoading}
                    isBackdropVisible={false}
                    opacity=".8"
                    isLight={false}
                />
            )}
        </div>
    );
});
