import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { friendsActions } from "../../../../store/actions";
import { CustomSearch } from "../../../shared/custom-search/custom-search";
import { CustomSwitch } from "../../../shared/custom-switch/custom-switch";

import classNames from "./friends-requests.module.scss";

const mapStateToProps = ({ friends: { requests } }) => ({
    incomingRequests: requests.incoming,
    outcomingRequests: requests.outcoming,
});

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
});

export const FriendRequests = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ incomingRequests, outcomingRequests, friendsActions }) => {
    return (
        <div className={classNames.friendsRequests}>
            <div>
                <div className={classNames.toggler}>
                    <span>Входящие заявки</span>
                    <CustomSwitch
                        checked={incomingRequests.isVisible}
                        onChange={() =>
                            friendsActions.toggleRequestsVisibility("incoming")
                        }
                    />
                    <CustomSearch />
                </div>
                {incomingRequests.isVisible && <div>Входящие</div>}
            </div>
            <div>
                <div className={classNames.toggler}>
                    <span>Исходящие заявки</span>
                    <CustomSwitch
                        checked={outcomingRequests.isVisible}
                        onChange={() =>
                            friendsActions.toggleRequestsVisibility("outcoming")
                        }
                    />
                    <CustomSearch />
                </div>
                {outcomingRequests.isVisible && <div>Исходящие</div>}
            </div>
        </div>
    );
});
