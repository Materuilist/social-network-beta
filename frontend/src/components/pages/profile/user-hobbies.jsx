import React from 'react';
import { connect } from 'react-redux';

import classNames from "./profile.module.scss";

export const UserHobbies = connect()(()=>{
    return <div className={classNames.userHobbies}>UserHobbies</div>
})