import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import getConfig from './utils/getConfig';

import adminRouter from './routes/admin'
import authRouter from './routes/auth'

import { Error } from './interfaces/common/error.class'

const app = express();
const dbConnectionString:string = getConfig().database;

app.use('/', (req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
})

app.use('/', bodyParser.json())

app.use('/auth', authRouter)
app.use('/admin', adminRouter);

app.use('/', (error: Error, req: Request, res: Response, next: NextFunction)=>{
    if(error){
        console.log(error)
        return res.status(error.status).json({ message:error.message })
    }
})

mongoose.connect(
    dbConnectionString,
    async err => {
        if(err){
            console.log(err);
            return;
        }
        
        app.listen(8000, ()=>{
            console.log('server started successfully!')
        })
    }
)