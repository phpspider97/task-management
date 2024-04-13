import React,{ useEffect, useState} from 'react'
import { useIncomingTaskQuery } from '../redux/api/TaskApi.js'

export default function TotalNotification({render}) {
    const [incoingTaskData,setIncoingTaskData] = useState(0)
    const {data:incomingTask,error} = useIncomingTaskQuery()
   
    useEffect(()=>{
        setIncoingTaskData((prev)=> prev=incomingTask?.data?.length)
    },[incomingTask]) 
    return (
        <>
            {render(incoingTaskData)}
        </>
    )
}