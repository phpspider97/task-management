import React, { useEffect, useState } from 'react'
import LeftBar from './common/LeftBar'
import { useIncomingTaskQuery } from '../redux/api/TaskApi.js'
import { totalNotification } from '../redux/storeData/StoreData.js'
import { useDispatch } from 'react-redux'
const IncomingTask = () => {  
    const [incoingTaskData,setIncoingTaskData] = useState([])
    const {data:incomingTask,error} = useIncomingTaskQuery()
    const dispatch = useDispatch()
   
    useEffect(()=>{
        setIncoingTaskData((prev)=> prev=incomingTask?.data)
    },[incomingTask])

    useEffect(()=>{
        dispatch(totalNotification(incoingTaskData?.length))
    },[incoingTaskData])

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
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Task</th> 
                                    <th>Due Date</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    incoingTaskData && (incoingTaskData?.map((item,key)=>(
                                        <tr key={key}>
                                            <th scope="row">{key+1}</th>
                                            <td>{item.title}</td> 
                                            <td>{item.dueDate.split('T')[0]}</td>  
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                    </div> 
                </div> 
            </div>
        </div>
    )
}
export default IncomingTask