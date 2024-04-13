import express from 'express'
import cors from 'cors'
import path from 'path'
import http from 'http'
import cluster from 'cluster'
import { Worker } from 'worker_threads'
import responseTime from 'response-time' 
const __dirname = path.resolve();
const app = express()
const PORT = process.env.PORT || 4000
import 'dotenv/config'
import os from'os' 
const numCPUs = os.cpus().length 

import userRoute from './routes/userRoute.js' 
import PracticeModel from './models/PracticeModel.js'
import { dummyData } from './util/dummy.js'
import mongoConnect from './config/db.js'
import sendSqs from './service/send-sqs.js'
import receiveSqs from './service/receive-sqs.js'

import client from 'prom-client'
import './util/promethius.js'
import logger from './util/winston.js'
const reqResTime = new client.Histogram({ 
    name: 'http_express_req_res_time', 
    help: 'metric_help' ,
    labelNames:["method", "route", "status_code"],
    buckets:[1,50,100,200,400,800,1000,2000],
});
app.use(responseTime((req,res,time)=>{ 
    reqResTime.labels({
        method:req.method,
        route:req.url,
        status_code:res.statusCode
    }).observe(time)
}))
app.get('/matrics', async (req,res)=>{ 
    res.setHeader("Content-Type",client.register.contentType)
    const metrics = await client.register.metrics() 
    res.status(200).send(metrics)
}) 

mongoConnect(process.env.MONGO_URL)

//import './util/circuitBreaker.js' 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
 
app.use('/src/uploads', express.static('src/uploads'))

if(cluster.isPrimary) { 
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    })
}else{
    app.use('/user',userRoute) 

    app.get('/',(req,res)=>{ 
        logger.info('Some one visit in index page.')
        res.send('<h1>This is user backend!!</h1>')
    })

    app.get('/health',(req,res)=>{ 
        res.status(200).send('This is health page.')
    }) 
 
    app.get('/calcualtion',(req,res)=>{
        const worker = new Worker('./src/util/calculate.js')
        try{
            worker.on('message', (message) => { 
                const responseData = `Worker ${cluster.worker.id} received message: ${message}`
                res.send(responseData)
            })
            worker.on('error', (err) => {
                console.error(err)
            })
            worker.on('exit', (code) => {
                if (code !== 0) {
                    console.error(`Worker ${cluster.worker.id} exited with code ${code}`)
                }
            })
        }catch(err){
            res.send(err.message)
        }
    })

    app.get('/practice',async (req,res)=>{
        try{
            const responseData = await PracticeModel.find()
            res.status(200).json(responseData)
        }catch(err){ 
            res.status(500).json({message:err.message})
        }
    })
    
    app.get('/send-sqs', async (req,res)=>{
        const jsonData = await fetch('https://fakestoreapi.com/products/1')
        const productData = await jsonData.json() 
        sendSqs('product-data',productData)
        res.send('Add sqs for product!!')
    })

    app.get('/receive-sqs', async (req,res)=>{
        const getSqsData = await receiveSqs('product-data') 
        res.status(200).json({data:getSqsData})
    })
  
    app.listen(PORT,()=>{
        //console.log(`Backend server connected @ ${process.pid}!!`)
    })
}

