import express from 'express';
import { Types } from 'mongoose';

import { TokenProcessor } from '../services/tokenProcessor';
import { User } from '../models/user';
import { Error } from '../interfaces/common/error.class';

const router = express.Router();

//список друзей любого пользователя
//авторизация не нужна
//userId - код интересующего юзера
router.get('/list/:userId', async (req, res, next)=>{
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('friends').exec();
    const { friends } = user;
    console.log(user)
    res.status(200).json({friends})
})

router.use('/', async (req, res, next)=>{
    if(req.method === 'OPTIONS'){
        return next();
    }
    const token = req.headers.authorization.split(':')[1];
    const user = await TokenProcessor.decodeToken(token);
    if(!user){
        return next(new Error(401, 'Вы не авторизованы!'))
    }
    req.body.user = user;
    next();
})

//userId - код добавляемого юзера
router.post('/add', async (req, res, next)=>{
    const friendToAddId = req.body.userId;

    const { login:curresntUserLogin } = req.body.user;
    const user = await User.findOne({login:curresntUserLogin});
    const friendToAdd = await User.findById(friendToAddId);

    
    // friendToAdd.friends.requests.incoming.push(user.id);
    // user.friends.requests.outcoming.push(friendToAddId);
    await Promise.all([user.save(), friendToAdd.save()]);

    return res.status(200).json({message:'Заявка успешно отправлена!'})
})

export default router;