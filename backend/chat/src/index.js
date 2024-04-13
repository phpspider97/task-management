import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors' 
import mongoConnect from './config/db.js'
import ChatModel from "./models/ChatModel.js";
import authCheck from './middlewares/authMiddleware.js'
mongoConnect(process.env.MONGO_URL)
const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server,{
    cors: {
      origin: '*',
    }
})
 
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
});

app.get('/health',(req,res)=>{ 
    res.status(200).send('This is health page.')
})
 
io.on('connection', async (socket) => {
    // Intial Get Data
    var getAllMessage = await ChatModel.find({})
    io.emit('admin_chat', getAllMessage)
    // Intial Get Data

    socket.on('admin_chat', async (data) => {
        let userToken = data.token
        let getUserData = authCheck(userToken) 
        let addData = {
            message:data.message,
            sendBy:getUserData.name
        }
        try{ 
            // await ChatModel.deleteMany({})
            // return
            await ChatModel.create(addData)
            var getAllMessage = await ChatModel.find({})  
        }catch(err){
            io.emit('admin_chat', err.message)
            return
        }
        io.emit('admin_chat', getAllMessage)
    })
    
    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

server.listen(3004, () => {
    console.log('server running at http://localhost:3004');
});