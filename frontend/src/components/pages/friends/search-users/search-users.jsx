import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { UserItem } from "../user-item";
import { CustomSearch } from "../../../shared/custom-search/custom-search";
import { CustomLoader } from "../../../shared/custom-loader/custom-loader";
import { friendsActions } from "../../../../store/actions";

import classNames from "./search-users.module.scss";

const mapStateToProps = ({ friends: { strangers, filters } }) => ({
    strangers,
    filter: filters.strangers,
});

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
});

export const SearchUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ strangers, friendsActions, filter }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        friendsActions.getStrangers(1, () => setIsLoading(false));
    }, []);

    return (
        <div className={classNames.strangersSearch}>
            <CustomLoader isLoading={isLoading} />
            <CustomSearch
                placeholder="Поиск"
                defaultSearchText={filter.searchText}
                onSearchTextChange={(searchText) =>
                    friendsActions.changeStrangersSearchText(searchText)
                }
            />
            {!isLoading && (
                <>
                    {strangers.length ? (
                        <div className={classNames.strangers}>
                            <h4>Поиск</h4>
                            <div className={classNames.strangersContainer}>
                                {strangers.map(({ _id, login }) => (
                                    <UserItem
                                        key={_id}
                                        id={_id}
                                        login={login}
                                    />
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
