import React, { useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { CustomSelect } from "../../../shared/custom-select/custom-select";
import { dictionariesActions, friendsActions } from "../../../../store/actions";

const mapStateToProps = ({ friends: { filters }, dictionaries }) => ({
    filter: filters.strangers,
    dictionaries,
});

const mapDispatchToProps = (dispatch) => ({
    friendsActions: bindActionCreators(friendsActions, dispatch),
    dictionariesActions: bindActionCreators(dictionariesActions, dispatch),
});

export const StrangersFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ filter, dictionaries, friendsActions, dictionariesActions }) => {
    const [areCitiesLoading, setAreCitiesLoading] = useState(
        !dictionaries.cities.length
    );
    const [areInterestsLoading, setAreInterestsLoading] = useState(
        !dictionaries.interests.length
    );

    const [filterState, setFilterState] = useState(filter);

    const filterTimeoutRef = useRef();
    const isFirstRenderRef = useRef(true);

    const FILTER_DELAY = 1000;

    const commonInterests = useMemo(() => {
        return dictionaries.interests.filter(({ isCustom }) => !isCustom);
    }, [dictionaries.interests]);

    useEffect(() => {
        areCitiesLoading &&
            dictionariesActions.getCities(() => setAreCitiesLoading(false));
        areInterestsLoading &&
            dictionariesActions.getAvailableInterests(() =>
                setAreInterestsLoading(false)
            );
    }, []);

    useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            return;
        }

        filterTimeoutRef.current = setTimeout(() => {
            console.log(filterState);
        }, FILTER_DELAY);
    }, [filterState]);

    const changeFilter = (name, value) => {
        clearTimeout(filterTimeoutRef.current);

        setFilterState({
            ...filterState,
            [name]: value,
        });
    };

    return (
        <div>
            <CustomSelect
                busy={areCitiesLoading}
                multiple={true}
                options={dictionaries.cities}
                value={filterState.cities}
                onChange={(value) => changeFilter("cities", value)}
            />
            <CustomSelect
                busy={areInterestsLoading}
                multiple={true}
                options={commonInterests}
                value={filterState.interests}
                onChange={(value) => changeFilter("interests", value)}
            />
        </div>
    );
});
