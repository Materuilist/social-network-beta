import { BaseService } from "./base.service";

export const AuthService = class extends BaseService{
    constructor(){
        super(false);
    }

    async request(url, options){
        return super.request(`auth/${url}`, options);
    }

    async getUser(jwt){
        return await this.request('get-user', {
            headers:{
                'Authorization':`Bearer:${jwt}`
            }
        });
    }

    async register(login, password){
        const res = await this.request('signup', {
            method:'POST',
            body:JSON.stringify({
                login,
                password
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        
        console.log(res);
        return res;
    }

    async login(login, password){
        const res = await this.request('signin', {
            method:'POST',
            body:JSON.stringify({
                login,
                password
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        
        console.log(res);
        return res;
    }
}