import express from 'express';
import { Encrypter } from '../services/encrypter';

import { User } from '../models/user';

const router = express.Router();

router.get('/initialize', async (req, res, next)=>{
    await User.deleteMany({});

    await User.create({
        login:'Admin',
        password:await Encrypter.hash('admin123')
    })


    res.status(201).json({message:'Initialized successfully'})
})

export default router;