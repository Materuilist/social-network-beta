import express from 'express';

import { IUser } from '../interfaces/entities/user.interface';
import { Error } from '../interfaces/common/error.class';
import { User } from '../models/user';
import { Encrypter } from '../services/encrypter';
import { TokenProcessor } from '../services/tokenProcessor';

const router = express.Router();

router.post('/signup', async(req, res, next)=>{
    const body = req.body as IUser;
    if(!body){
        return next(new Error(400, 'Введены не все данные'));
    }

    const { login, phone, password } = body;

    const sameLoginUsers:IUser[] = await User.find({login})
    if(sameLoginUsers.length!==0){
        return next(new Error(400, 'Пользователь с таким логином уже существует!'))
    }

    const samePhoneUsers:IUser[] = await User.find({phone})
    if(samePhoneUsers.length!==0){
        return next(new Error(400, 'Пользователь с таким номером телефона уже существует!'))
    }

    await User.create({
        ...body,
        password:await Encrypter.hash(password)
    })

    res.status(201).json({
        message:'Регистрация прошла успешно!',
        token:await TokenProcessor.getToken(login)
    })
})

export default router;