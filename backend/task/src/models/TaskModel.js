import mongoose, { Schema } from 'mongoose'

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    dueDate : {
        type : Date,
        required : true
    },
    priority : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    isActive : {
        type : Number,
        required : false
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref:'user',
        required : true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const TaskModel = mongoose.model('task',taskSchema)

export default TaskModel