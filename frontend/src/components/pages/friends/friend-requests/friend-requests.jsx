import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { otherUserTypes } from "../../../../constants";

import { friendsActions } from "../../../../store/actions";
import { CustomLoader } from "../../../shared/custom-loader/custom-loader";
import { CustomSearch } from "../../../shared/custom-search/custom-search";
import { CustomSwitch } from "../../../shared/custom-switch/custom-switch";
import { UserItem } from "../user-item";

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        friendsActions.getRequests(() => setIsLoading(false));
    }, []);

    return (
        <div className={classNames.friendsRequests}>
            <CustomLoader isLoading={isLoading} />
            <div
                className={
                    incomingRequests.isVisible ? classNames.visible : ""
                }
            >
                <div className={classNames.toggler}>
                    <span>Входящие заявки</span>
                    <CustomSwitch
                        checked={incomingRequests.isVisible}
                        onChange={() =>
                            friendsActions.toggleRequestsVisibility("incoming")
                        }
                    />
                    <CustomSearch
                        disabled={
                            isLoading ||
                            !incomingRequests.isVisible ||
                            !incomingRequests.data.length
                        }
                    />
                </div>
                {incomingRequests.isVisible && (
                    <div>
                        {!incomingRequests.data.length && <p>Нет заявок...</p>}
                        {incomingRequests.data.map(
                            ({ _id, login, isOnline, avatar }) => (
                                <UserItem
                                    key={_id}
                                    id={_id}
                                    isOnline={isOnline}
                                    login={login}
                                    avatar={avatar}
                                    userType={otherUserTypes.INCOMING_REQUEST}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
            <div
                className={
                    outcomingRequests.isVisible ? classNames.visible : ""
                }
            >
                <div className={classNames.toggler}>
                    <span>Исходящие заявки</span>
                    <CustomSwitch
                        checked={outcomingRequests.isVisible}
                        onChange={() =>
                            friendsActions.toggleRequestsVisibility("outcoming")
                        }
                    />
                    <CustomSearch
                        disabled={
                            isLoading ||
                            !outcomingRequests.isVisible ||
                            !outcomingRequests.data.length
                        }
                    />
                </div>
                {outcomingRequests.isVisible && (
                    <div>
                        {!outcomingRequests.data.length && <p>Нет заявок...</p>}
                        {outcomingRequests.data.map(
                            ({ _id, login, isOnline, avatar }) => (
                                <UserItem
                                    key={_id}
                                    id={_id}
                                    isOnline={isOnline}
                                    login={login}
                                    avatar={avatar}
                                    userType={otherUserTypes.OUTCOMING_REQUEST}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});
