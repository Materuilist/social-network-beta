import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';

import { userInfoReducer } from './user-info/user-info.reducer';

const reducers = {
    userInfo:userInfoReducer,
}

export const createRootReducer = history => combineReducers({
    router:connectRouter(history),
    ...reducers
})