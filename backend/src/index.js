import express from 'express'
import cors from 'cors'
import path from 'path'
const __dirname = path.resolve();
const app = express()
const PORT = process.env.PORT || 4000
import 'dotenv/config'

import userRoute from './routes/userRoute.js'
import taskRoute from './routes/taskRoute.js'
import PracticeModel from './models/PracticeModel.js'
import { dummyData } from './util/dummy.js'
import mongoConnect from './config/db.js'
mongoConnect(process.env.MONGO_URL)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/src/uploads', express.static('src/uploads'));
  
app.use('/user',userRoute)
app.use('/task',taskRoute)

app.get('/',(req,res)=>{
    res.send('<h1>This is backend!!</h1>')
})

app.get('/practice',async (req,res)=>{
    try{
        const responseData = await PracticeModel.find()
        res.status(200).json(responseData)
    }catch(err){ 
        res.status(500).json({message:err.message})
    }
})

app.listen(PORT,()=>{
    console.log('Backend server connected!!')
})