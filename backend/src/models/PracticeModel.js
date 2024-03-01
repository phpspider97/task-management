import mongoose, { Schema } from 'mongoose'

const practiceSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    address : {
        type : Object,
        required : true
    },
    interests : {
        type : Array,
        required : true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const PracticeModel = mongoose.model('practice',practiceSchema)

export default PracticeModel