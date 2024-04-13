import React,{ useState, useEffect } from 'react'
import LeftBar from './common/LeftBar'
import { Link } from 'react-router-dom' 
import { useTaskListQuery, useDeleteTaskMutation, useUpdateStatusTaskMutation, useSearchTaskMutation, useSortTaskMutation } from '../redux/api/TaskApi.js'

 const ManageTask = () => {
    const [taskData, setTaskData] = useState([])
    const [taskSortText, setTaskSortText] = useState('A')
    const {data:getTaskData, error, isLoading} = useTaskListQuery()
    const [deleteTaskQuery] = useDeleteTaskMutation()
    const [updateTaskStatus] = useUpdateStatusTaskMutation()
    const [searchTask] = useSearchTaskMutation()
    const [sortTask] = useSortTaskMutation()

    useEffect(()=>{ 
        setTaskData(getTaskData?.data)
    },[getTaskData])

    const deleteTask = (id) => {
        deleteTaskQuery(id).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err.message)
        })
    }
    const changeStatus = (id,status) => {
        updateTaskStatus({id,status}).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err.message)
        })
    }
    const searchData = (searchPayload) => {
        if(!searchPayload) return setTaskData(getTaskData.data)
        searchTask(searchPayload).then((response)=>{
            setTaskData(response.data.data)
        }).catch((err)=>{
            console.log(err.message)
        })
    }
    const sortData = () => { 
        const sortValue = (taskSortText == 'A')?-1:1
        const sortTextValue = (taskSortText == 'A')?'D':'A'
        sortTask(sortValue).then((response)=>{
            setTaskData(response.data.data)
            setTaskSortText(sortTextValue)
        }).catch((err)=>{
            console.log(err.message)
        })
    }
    
    return (
        <div className="row"> 
            <div className="col-md-2">
                <LeftBar />
            </div>
            <div className="col-md-10">
                <div className="form-container">
                    <div className="row">
                        <div className="col-md-8 text-end">
                            &nbsp;
                        </div>
                        <div className="col-md-4 text-end">
                            <input type="search" className="form-control mb-3" placeholder="Search..." onChange={(e)=>{searchData(e.target.value)}} />
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Task <span onClick={sortData} className="show-pointer">{ (taskSortText=='A')?<i className="fa-solid fa-sort-up"></i>:<i className="fa-solid fa-sort-down"></i> }</span></th>
                                    <th>Priority</th>
                                    <th>Due Date</th>
                                    <th>Is Active</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    taskData && taskData?.map((item,key)=>(
                                        <tr key={key}>
                                            <th scope="row">{key+1}</th>
                                            <td>{item.title}</td>
                                            <td>{item.priority.toUpperCase()}</td>
                                            <td>{item.dueDate.split('T')[0]}</td>
                                            <td>{(item.isActive ==1)?
                                                <button className="btn btn-sm btn-success" onClick={()=>{changeStatus(item._id,0)}}>Active</button>
                                                :
                                                <button className="btn btn-sm btn-danger" onClick={()=>{changeStatus(item._id,1)}}>De-Active</button>
                                                }
                                            </td>
                                            <td>
                                                <Link to={`/add-task/${item._id}`} className="show-pointer">Edit</Link> |
                                                <span onClick={()=>{deleteTask(item._id)}} className="show-pointer"> Delete</span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div> 
                </div> 
            </div>
        </div>
    )
}
export default ManageTask