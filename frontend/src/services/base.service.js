import { push } from 'connected-react-router';

import Config from 'Config';
import { store } from '../store/index';

export const BaseService = class{
    constructor(authRequired = true){
        this._apiUrl = Config.serverUrl;
        this.authRequired = authRequired;
    }

    async request(url, options){
        let headers = {};

        //прикрепляем токен или отправляем пользователя авторизовываться
        if(this.authRequired){
            const jwt = localStorage.getItem('jwt');

            if(!jwt){
                //главный компонент сам решит, куда направить неавторизованного юзера
                store.dispatch(push('/'))
                return;
            }else{
                headers = {...headers, 'Authorization':`Bearer:${jwt}`}
            }
        }

        const response = await fetch(`${this._apiUrl}/${url}`, {
            ...options,
            headers:{
                ...options&&options.headers,
                ...headers
            }
        });

        return response;
    }
}