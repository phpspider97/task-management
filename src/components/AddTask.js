import React,{ useEffect, useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import LeftBar from './common/LeftBar'
import { useForm } from 'react-hook-form'
import { useAddTaskMutation, usePerticularTaskListQuery, useEditTaskMutation } from '../redux/api/TaskApi.js'

const AddTask = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [methodType,setMethodType] = useState('add')
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [addTask] = useAddTaskMutation()
    const [updateTask] = useEditTaskMutation()
    const {data:getTaskData} = usePerticularTaskListQuery(id)
     
    useEffect(()=>{
        setValue('title',getTaskData?.data.title)
        setValue('priority',getTaskData?.data.priority)
        setValue('description',getTaskData?.data.description)
        setValue('dueDate',getTaskData?.data.dueDate.split('T')[0])
        setValue('isActive',getTaskData?.data.isActive)
        if(id != undefined){
            setMethodType('edit')
        }
    },[id,getTaskData])

    const submitForm = (data) => {
        if(methodType == 'add'){
            addTask(data).then((response)=>{
                navigate('/manage-task')
            }).catch((err)=>{
                console.log(`Error : ${err.message}`)
            })
        }else{
            updateTask({id,...data}).then((response)=>{
                navigate('/manage-task')
            }).catch((err)=>{
                console.log(`Error : ${err.message}`)
            })
        }
    } 
    return (
        <div className="row"> 
            <div className="col-md-2">
                <LeftBar />
            </div>
            <div className="col-md-10">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="form-container">
                        <h3><u>Add Task</u></h3><br />
                        <input type="text" className="form-control" placeholder="Title" {...register("title", { required: true })}/>
                        {errors.title && <span className="error-message">This field is required</span>}

                        <input type="date" className="form-control mt-4" placeholder="Due date" {...register("dueDate", { required: true })}/>
                        {errors.dueDate && <span className="error-message">This field is required</span>}

                        <select className="form-select mt-4" {...register("priority", { required: true })}>
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        {errors.priority && <span className="error-message">This field is required</span>}

                        <textarea className="form-control mt-4" placeholder='Description' rows="6" {...register("description", { required: true })}></textarea>
                        {errors.description && <span className="error-message">This field is required <br /></span>}

                        <input type="checkbox" className="mt-4" value="1" {...register("isActive", { required: false })}/> Is Active <br />
                        {errors.isActive && <span className="error-message">This field is required</span>}

                        <button type="submit" className="btn btn-secondary w-100 mt-4">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddTask