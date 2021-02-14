import React from "react";
import { connect } from "react-redux";

import { CustomSearch } from "../../../shared/custom-search/custom-search";

export const CurrentFriends = connect()(({}) => {
    return (
        <div>
            <CustomSearch placeholder="Поиск" />
        </div>
    );
});
