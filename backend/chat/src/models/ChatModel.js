import mongoose, { Schema } from 'mongoose'

const chatSchema = new mongoose.Schema({
    message : {
        type : String,
        required : true
    },
    sendBy : {
        type : String,
        required : true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const ChatModel = mongoose.model('chat',chatSchema)

export default ChatModel