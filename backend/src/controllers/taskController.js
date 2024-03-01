import TaskModel from "../models/TaskModel.js"
import mongoose from 'mongoose'
const objectId = mongoose.Types.ObjectId

const analysisTask = async (req,res) => {
    try{  
        const totalTask = await TaskModel.countDocuments({createdBy:req.userID})
        const totalActiveTask = await TaskModel.countDocuments({$and : [{createdBy:req.userID},{isActive:1}]})
        const analysisData = {
            totalTask,
            totalActiveTask
        }
        res.status(200).json({message:'Task analysis.',data:analysisData})
    }catch(err){
        res.status(500).json({message:err.message})
    }
} 
const perticularTask = async (req,res) => {
    try{ 
        const perticularTaskList = await TaskModel.findOne({_id:req.params.id})
        res.status(200).json({message:'Perticular task list.',data:perticularTaskList})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const allTask = async (req,res) => {
    try{
        const taskList = await TaskModel.find({createdBy:req.userID})
        res.status(200).json({message:'Task list.',data:taskList})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const addTask = async (req,res) => {
    try{ 
        req.body.createdBy = req.userID
        const addTask = await TaskModel.create(req.body)
        res.status(200).json({message:'Task created.',data:addTask})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const editTask = async (req,res) => {
    try{ 
        const payload = req.body
        const updateTask = await TaskModel.updateOne({_id:req.params.id},{$set:payload})
        res.status(200).json({message:'Task edited.',data:updateTask})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const deleteTask = async (req,res) => {
    try{
        const deleteTask = await TaskModel.deleteOne({_id:req.params.id})
        res.status(200).json({message:'Task deleted.',data:deleteTask})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const editTaskStatus = async (req,res) => {
    try{  
        const payload = req.body 
        const updateTask = await TaskModel.updateOne({_id:req.params.id},{$set:{isActive:payload.status}})
        res.status(200).json({message:'Update task status.',data:updateTask})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const searchTask = async (req,res) => {
    try{ 
        const getSearchQuery = req.body.searhData
        const searchTask = await TaskModel.find({title: getSearchQuery })
        res.status(200).json({message:'Task search result.',data:searchTask})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const sortTask = async (req,res) => {
    try{ 
        const searchTask = await TaskModel.find({}).sort({title:parseInt(req.params.id)})
        res.status(200).json({message:'Task search result.',data:searchTask})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const incomingTask = async (req,res) => {
    try{ 
        let currentDate = new Date() 
        const searchTask = await TaskModel.aggregate([
            { $addFields : { dateDifference :  { $abs : { $divide : [ { $subtract : ['$dueDate',currentDate] }, 1000 * 60 * 60 * 24 ] } } } },
            { $match : { $and : [{ createdBy : new objectId(req.userID) },{dateDifference : { $lte : 2 } } ] } }
        ]) 
        res.status(200).json({message:'Task search result.',data:searchTask})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const taskController = {
    allTask,
    addTask,
    editTask,
    deleteTask,
    perticularTask,
    analysisTask,
    editTaskStatus,
    searchTask,
    sortTask,
    incomingTask
}