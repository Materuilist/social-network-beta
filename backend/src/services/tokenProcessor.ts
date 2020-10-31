import { sign, verify } from 'jsonwebtoken'

import config from '../../config.dev.json'

export class TokenProcessor{
    static async getToken(login:string){
        return await sign({login}, config.token.privateKey, {
            expiresIn:config.token.duration
        })
    }

    static async verifyToken(verifiedLogin:string, token:string){
        try{
            await verify(token, config.token.privateKey)
            return true
        }catch{
            return false
        }
    }
}