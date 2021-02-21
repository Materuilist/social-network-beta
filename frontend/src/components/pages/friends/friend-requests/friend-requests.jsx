import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { otherUserTypes } from "../../../../constants";

import { friendsActions } from "../../../../store/actions";
import { CustomLoader } from "../../../shared/custom-loader/custom-loader";
import { CustomSearch } from "../../../shared/custom-search/custom-search";
import { CustomSwitch } from "../../../shared/custom-switch/custom-switch";
import { UserItem } from "../user-item";

import classNames from "./friends-requests.module.scss";

const mapStateToProps = ({ friends: { requests, filters } }) => ({
    incomingRequests: requests.incoming,
    outcomingRequests: requests.outcoming,
    filter: filters.strangers,
});

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
});

export const FriendRequests = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ incomingRequests, outcomingRequests, friendsActions, filter }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchedIncomingRequests, setSearchedIncomingRequests] = useState(
        []
    );
    const [searchedOutcomingRequests, setSearchedOutcomingRequests] = useState(
        []
    );

    useEffect(() => {
        friendsActions.getRequests(() => setIsLoading(false));
    }, []);

    const filterRequests = (requests) =>
        requests.data.filter(({ city, interests, birthDate, sex }) => {
            const citySatisfies =
                filter.cities.length === 0 ||
                filter.cities.find((cityId) => city === cityId);
            const interestsSatisfy =
                filter.interests.length === 0 ||
                filter.interests.find((interestId) =>
                    interests.find(
                        (userInterestId) => userInterestId === interestId
                    )
                );
            let ageSatisfies = filter.anyAge;
            if (!filter.anyAge) {
                if (
                    !birthDate ||
                    new Date(birthDate).toString() === "Invalid Date"
                ) {
                    ageSatisfies = false;
                } else {
                    const userAge =
                        new Date(Date.now() - new Date(birthDate)).getYear() -
                        70;
                    ageSatisfies =
                        userAge >= filter.ageBottom && userAge <= filter.ageTop;
                }
            }
            const sexSatisfies = !filter.sex || sex === filter.sex;
            return (
                citySatisfies &&
                interestsSatisfy &&
                ageSatisfies &&
                sexSatisfies
            );
        });

    const incomingRequestsFiltered = useMemo(() => {
        return filterRequests(incomingRequests);
    }, [filter, incomingRequests]);

    const outcomingRequestsFiltered = useMemo(() => {
        return filterRequests(outcomingRequests);
    }, [filter, outcomingRequests]);

    const addFriend = (userId) => {
        if (!userId) return;

        setIsLoading(true);
        friendsActions.addFriend(userId, () =>
            friendsActions.getRequests(() => setIsLoading(false))
        );
    };

    const deleteFriend = (userId) => {
        if (!userId) return;

        setIsLoading(true);
        friendsActions.deleteFriend(userId, () =>
            friendsActions.getRequests(() => setIsLoading(false))
        );
    };

    return (
        <div className={classNames.friendsRequests}>
            <CustomLoader
                isLoading={isLoading}
                isBackdropVisible={false}
                isLight={false}
                opacity=".8"
            />
            <div
                className={incomingRequests.isVisible ? classNames.visible : ""}
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
                        searchField="login"
                        options={incomingRequestsFiltered}
                        onChange={(searchedItems) =>
                            setSearchedIncomingRequests(searchedItems)
                        }
                    />
                </div>
                {incomingRequests.isVisible && (
                    <div>
                        {!searchedIncomingRequests.length && (
                            <p>Нет заявок...</p>
                        )}
                        {searchedIncomingRequests.map(
                            ({ _id, login, isOnline, avatar }) => (
                                <UserItem
                                    key={_id}
                                    id={_id}
                                    isOnline={isOnline}
                                    login={login}
                                    avatar={avatar}
                                    userType={otherUserTypes.INCOMING_REQUEST}
                                    onAdd={(userId) => addFriend(userId)}
                                    onDelete={(userId) => deleteFriend(userId)}
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
                        searchField="login"
                        options={outcomingRequestsFiltered}
                        onChange={(searchedItems) =>
                            setSearchedOutcomingRequests(searchedItems)
                        }
                    />
                </div>
                {outcomingRequests.isVisible && (
                    <div>
                        {!searchedOutcomingRequests.length && (
                            <p>Нет заявок...</p>
                        )}
                        {searchedOutcomingRequests.map(
                            ({ _id, login, isOnline, avatar }) => (
                                <UserItem
                                    key={_id}
                                    id={_id}
                                    isOnline={isOnline}
                                    login={login}
                                    avatar={avatar}
                                    userType={otherUserTypes.OUTCOMING_REQUEST}
                                    onAdd={(userId) => addFriend(userId)}
                                    onDelete={(userId) => deleteFriend(userId)}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});
