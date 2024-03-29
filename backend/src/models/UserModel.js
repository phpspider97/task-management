import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    image : {
        type : String,
        required : false,
    },
    password : {
        type : String,
        required : true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const UserModel = mongoose.model('user',userSchema)

export default UserModel