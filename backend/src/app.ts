import express from 'express';
import mongoose from 'mongoose';

import getConfig from './utils/getConfig';

const app = express();
const dbConnectionString:string = getConfig().database;

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