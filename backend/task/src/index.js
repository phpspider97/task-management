import express from 'express'
import cors from 'cors'
import path from 'path'
import http from 'http'
import cluster from 'cluster'
import { Worker } from 'worker_threads'

const __dirname = path.resolve();
const app = express()
const PORT = process.env.PORT || 4000
import 'dotenv/config'
import os from'os' 
const numCPUs = os.cpus().length

import taskRoute from './routes/taskRoute.js' 
import { dummyData } from './util/dummy.js'
import mongoConnect from './config/db.js'
mongoConnect(process.env.MONGO_URL)

//import './util/circuitBreaker.js'
 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
 
app.use('/src/uploads', express.static('src/uploads'));
 
if(cluster.isPrimary) { 
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    })
}else{ 
    app.use('/task',taskRoute)

    app.get('/',(req,res)=>{ 
        res.send('<h1>This is task backend!!</h1>')
    })
    app.get('/health',(req,res)=>{ 
        res.status(200).send('This is health page.')
    }) 
    app.listen(PORT,()=>{
        console.log(`Backend server connected @ ${process.pid}!!`)
    })
}