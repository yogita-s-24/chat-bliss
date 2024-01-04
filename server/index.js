import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

import {getHealthApi, postApiV1Signup} from "./controllers/user.js"

const app = express();
app.use(express.json());

const connectionDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if(conn){
        console.log("MongoDb Connected Successfully.");
    }
}
connectionDB();

app.get('/api/v1/healths', getHealthApi);

//post api for signup
app.post('/api/v1/signups', postApiV1Signup);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
})
