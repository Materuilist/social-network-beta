import React from 'react';
import { connect } from 'react-redux';

import classNames from "./profile.module.scss";

export const UserPhotos = connect()(()=>{
    return <div className={classNames.userPhotos}>UserPhotos</div>
})