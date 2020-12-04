import { Document, Types } from 'mongoose'

export interface IUser extends Document {
    login:string;
    password:string;
    phone?:string;
    friends?:[{
        type:Types.ObjectId,
        ref:'User'
    }]
    incomingRequests?:[{
        type:Types.ObjectId,
        ref:'User'
    }]
    ioutcomingRequests?:[{
        type:Types.ObjectId,
        ref:'User'
    }]
    
}