import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { UserItem } from "../user-item";
import { CustomSearch } from "../../../shared/custom-search/custom-search";
import { CustomLoader } from "../../../shared/custom-loader/custom-loader";
import { friendsActions } from "../../../../store/actions";

import classNames from "./search-users.module.scss";

const mapStateToProps = ({ friends: { strangers } }) => ({
    strangers,
});

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
});

export const SearchUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ strangers, friendsActions }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        friendsActions.getStrangers(1, () => setIsLoading(false));
    }, []);

    return (
        <div className={classNames.strangersSearch}>
            <CustomLoader isLoading={isLoading} />
            <CustomSearch placeholder="Поиск" />
            {!isLoading && (
                <>
                    {strangers.length ? (
                        <div className={classNames.strangers}>
                            <h4>Поиск</h4>
                            <div className={classNames.strangersContainer}>
                                {strangers.map(({ id, login }) => (
                                    <UserItem key={id} id={id} login={login} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>Пользователи не найдены...</p>
                    )}
                </>
            )}
        </div>
    );
});
