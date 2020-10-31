import { Schema, model, Types } from 'mongoose';

import { IUser } from '../interfaces/entities/user.interface'

const userSchema = new Schema({
    login:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String
    }
})

export const User = model<IUser>('User', userSchema);