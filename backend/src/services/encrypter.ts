import { compare, hash } from 'bcrypt';

import config from '../../config.dev.json'

export class Encrypter{
    constructor() {}

    static async hash(value:string){
        return await hash(value, config.salt)
    }

    static async verify(value:string, encrypted:string){
        return await compare(value, encrypted)
    }
}