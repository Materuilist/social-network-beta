import React, { useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormGroup, Input, Label } from "reactstrap";

import { CustomSelect } from "../../../shared/custom-select/custom-select";
import { CustomRadioButton } from "../../../shared/custom-radiobutton/custom-radiobutton";
import { dictionariesActions, friendsActions } from "../../../../store/actions";
import { CustomSwitch } from "../../../shared/custom-switch/custom-switch";

import classNames from "./filters.module.scss";

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

    const [filterState, setFilterState] = useState({
        remember: filter.remember,
        cities: filter.cities,
        interests: filter.interests,
        ageBottom: filter.ageBottom,
        ageTop: filter.ageTop,
        anyAge: filter.anyAge,
        sex: filter.sex,
    });

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
            friendsActions.changeStrangersFilter(filterState);
        }, FILTER_DELAY);
    }, [filterState]);

    const changeAge = (isBottom = true, value) => {
        if (
            value < 0 ||
            value > 140 ||
            (isBottom && value > filterState.ageTop) ||
            (!isBottom && value < filterState.ageBottom)
        ) {
            return;
        }

        changeFilter(isBottom ? "ageBottom" : "ageTop", value);
    };

    const changeFilter = (name, value) => {
        clearTimeout(filterTimeoutRef.current);

        setFilterState({
            ...filterState,
            [name]: value,
        });
    };

    return (
        <div className={classNames.strangersFilter}>
            <FormGroup className={classNames.citiesFormGroup}>
                <Label>Город</Label>
                <CustomSelect
                    busy={areCitiesLoading}
                    multiple={true}
                    options={dictionaries.cities}
                    value={filterState.cities}
                    onChange={(value) => changeFilter("cities", value)}
                />
            </FormGroup>
            <FormGroup className={classNames.interestsFormGroup}>
                <Label>Интересы</Label>
                <CustomSelect
                    busy={areInterestsLoading}
                    multiple={true}
                    options={commonInterests}
                    value={filterState.interests}
                    onChange={(value) => changeFilter("interests", value)}
                />
            </FormGroup>
            <FormGroup className={classNames.ageFormGroup}>
                <Label>Возраст</Label>
                <CustomSwitch
                    checked={filterState.anyAge}
                    onChange={(isSwitched) =>
                        changeFilter("anyAge", isSwitched)
                    }
                    labelText="Любой"
                />
                {!filterState.anyAge && (
                    <div>
                        <Input
                            type="number"
                            value={filterState.ageBottom}
                            onChange={({ target: { value } }) =>
                                changeAge(true, value)
                            }
                        />
                        <hr />
                        <Input
                            type="number"
                            value={filterState.ageTop}
                            onChange={({ target: { value } }) =>
                                changeAge(false, value)
                            }
                        />
                    </div>
                )}
            </FormGroup>
            <FormGroup className={classNames.sexFormGroup}>
                <Label>Пол</Label>
                <div>
                    <CustomRadioButton
                        name="sex"
                        labelText="М"
                        value="М"
                        onChange={(value) => changeFilter("sex", value)}
                        checked={filterState.sex === "М"}
                    />
                    <CustomRadioButton
                        name="sex"
                        labelText="Ж"
                        value="Ж"
                        onChange={(value) => changeFilter("sex", value)}
                        checked={filterState.sex === "Ж"}
                    />
                    <CustomRadioButton
                        name="sex"
                        labelText="Любой"
                        onChange={(value) => changeFilter("sex", null)}
                        checked={!filterState.sex}
                    />
                </div>
            </FormGroup>
        </div>
    );
});
