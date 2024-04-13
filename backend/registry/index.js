import express from 'express'
import axios from 'axios'
const app = express()
import Consul from 'consul'
const consul = new Consul();
 
const PORT = parseInt(process.env.REGISTRY_PORT)
const GET_USER_PORT = parseInt(process.env.USER_PORT)
const GET_TASK_PORT = parseInt(process.env.TASK_PORT)
const GET_CHAT_PORT = parseInt(process.env.CHAT_PORT)

const services = [
    { name: 'USER-SERVICE', port: GET_USER_PORT },
    { name: 'TASK-SERVICE', port: GET_TASK_PORT }, 
    { name: 'CHAT-SERVICE', port: GET_CHAT_PORT }, 
];

services.forEach((serviceDetail)=>{
    consul.agent.service.register({
        name: serviceDetail.name,
        port: serviceDetail.port,
        check: {
            http: `http://localhost:${serviceDetail.port}/health`,
            interval: '10s',
        },
    }, err => {
        if(err){
            console.error('Failed to register with Consul:', err);
            process.exit(1);
        }
        console.log(`Registered service '${serviceName}' with Consul`);
    })
})
 
process.on('SIGINT', () => {
    consul.agent.service.deregister(serviceName, () => {
        console.log(`Deregistered service '${serviceName}' from Consul`);
        process.exit();
    })
})
  
app.get('/',async (req,res)=>{
    const response = await axios.get(`http://localhost:8500/v1/agent/services`);
    const serviceData = response.data
    res.send(serviceData)
})

app.listen(PORT,()=>{
    console.log(`Registry service run @ ${PORT}`)
})

//consul agent -dev
//5672