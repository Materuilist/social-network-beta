import { SET_USER_INFO } from '../../actions/user-info/user.info.action.types';

const initialState = {
    login:null
}

export const userInfoReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case SET_USER_INFO:{
            return {...state, ...payload}
        }
        default:{
            return state;
        }
    }
}