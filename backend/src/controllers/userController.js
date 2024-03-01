import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const salt = 10
const jwtSalt = 'Thisissalt'

const getAllUser = async (req,res) => {
   const userData = await UserModel.find({})
   return userData
} 

const registerUser = async (req,res) => {
    try{
        req.body.password = await bcrypt.hash(req.body.password,salt)
        const userData = await UserModel.create(req.body)
        res.status(200).json({message:'User created.',data:userData})
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

const loginUser = async (req,res) => {
    try{
        const userData = await UserModel.findOne({email:req.body.email})
        if(!userData) return res.status(401).json({message:'Email not found.'}) 
        const isPasswordMatch = await bcrypt.compare(req.body.password,userData.password)
        if(!isPasswordMatch) return res.status(401).json({message:'Password not match.'}) 
        const token = jwt.sign(JSON.stringify(userData),jwtSalt) 
        res.status(200).json({message:`Welcome ${userData.name}.`,data:userData, token})
    }catch(err){
        res.status(401).json({message:err.message})
    }
}  
const updateUser = async (req,res) => {
    try{   
        const payload = req.body
        const updateUser = await UserModel.updateOne({_id:req.userID},{$set:{name:payload.name,image:req?.file?.path}})
        res.status(200).json({message:'User updated.',data:updateUser})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getUser = async (req,res) => { 
    try{ 
        const userData = await UserModel.findOne({_id:req.userID})
        res.status(200).json({message:'User detail.',data:userData})
    }catch(err){
        res.status(401).json({message:err.message})
    }
 } 

export const userConstroller = {
    getAllUser,
    registerUser,
    loginUser,
    updateUser,
    getUser
}