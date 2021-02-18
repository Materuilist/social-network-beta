import React from "react";
import { connect } from "react-redux";
import { FormGroup, Label } from "reactstrap";
import { bindActionCreators } from "redux";

import { sortTypes } from "../../../../constants";
import { friendsActions } from "../../../../store/actions";
import { CustomCheckbox } from "../../../shared/custom-checkbox/custom-checkbox";
import { CustomSelect } from "../../../shared/custom-select/custom-select";
import { CustomSwitch } from "../../../shared/custom-switch/custom-switch";

import ArrowIMG from "images/long-arrow.svg";

import classNames from "./filters.module.scss";

const mapStateToProps = ({
    friends: { filters },
    dictionaries: { friendsStatuses },
}) => ({
    filter: filters.currentFriends,
    friendsStatuses,
});

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
});

export const FriendsFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ filter, friendsActions, friendsStatuses }) => {
    return (
        <div className={classNames.friendsFilter}>
            <FormGroup className={classNames.sortByFormGroup}>
                <Label>Сортировать по:</Label>
                <CustomSelect
                    options={sortTypes.friends}
                    value={filter.sortBy}
                    onChange={(value) =>
                        friendsActions.changeFriendsFilter("sortBy", value)
                    }
                    search={false}
                />
                <img
                    src={ArrowIMG}
                    style={{
                        transform: filter.sortUp ? "unset" : "rotate(180deg)",
                    }}
                    title={filter.sortUp ? "По возрастанию" : "По убыванию"}
                    onClick={() =>
                        friendsActions.changeFriendsFilter(
                            "sortUp",
                            !filter.sortUp
                        )
                    }
                />
            </FormGroup>
            <FormGroup className={classNames.statusesFormGroup}>
                <Label>Показывать:</Label>
                {friendsStatuses.map(({ id, name, icon }) => {
                    const isChecked = Boolean(
                        filter.statuses.find((statusId) => statusId === id)
                    );

                    return (
                        <div
                            key={id}
                            onClick={() =>
                                friendsActions.changeFriendsFilter(
                                    "statuses",
                                    isChecked
                                        ? filter.statuses.filter(
                                              (statusId) => statusId !== id
                                          )
                                        : [...filter.statuses, id]
                                )
                            }
                        >
                            <CustomCheckbox
                                name="statuses"
                                checked={isChecked}
                                value={id}
                            />
                            <img src={icon} />
                            <span>{name}</span>
                        </div>
                    );
                })}
            </FormGroup>
            <CustomSwitch
                checked={filter.isOnline}
                onChange={() =>
                    friendsActions.changeFriendsFilter(
                        "isOnline",
                        !filter.isOnline
                    )
                }
                labelText='ONLINE'
            />
        </div>
    );
});
