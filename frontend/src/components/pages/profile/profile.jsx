import React from "react";

import { MainInfo } from "./main-info/main-info";
import { UserHobbies } from "./user-hobbies/user-hobbies";
import { UserPhotos } from "./user-photos/user-photos";

import classNames from "./profile.module.scss";

export const Profile = () => {
    return (
        <div className={classNames.profile}>
            <div>
                <MainInfo />
                <UserHobbies />
            </div>
            <UserPhotos />
        </div>
    );
};
