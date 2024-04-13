import React,{ useEffect, useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import LeftBar from './common/LeftBar' 
import { useForm } from 'react-hook-form'
import {io} from "socket.io-client"
const socket = io("http://localhost:3004")

const ChatToAdmin = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [messageData,setMessageData] = useState([])
    useState(()=>{
        socket.on('admin_chat', (data) => {
            setMessageData(data) 
        })
        return () => {
            socket.disconnect()
        }
    },[])
    
    const submitForm = (data) => {
        socket.emit('admin_chat', {message:data.message,sendBy:'client',token:sessionStorage.getItem('token')})
        setValue('message','')
    } 
    return (
        <div className="row"> 
            <div className="col-md-2">
                <LeftBar />
            </div>
            <div className="col-md-10">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="form-container">
                        <h3><u>Chat With Admin</u></h3><br />
                        <div className='chat-with-admin'>
                            <ol className="chat-with-admin-ul">
                            {
                                messageData.length>0 && messageData.map((message_data,key)=>(
                                    <li key={key} className={`${(message_data.sendBy == false)?'chat-with-admin-client-li':'chat-with-admin-li'} ml-4`}>
                                        &nbsp;&nbsp; {message_data.message} <sub>({message_data.sendBy})</sub>
                                    </li>
                                ))
                            }
                            </ol>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Message..." {...register("message", { required: true })}/>
                        {errors.message && <span className="error-message">This field is required</span>}
                        <button type="submit" className="btn btn-secondary w-100 mt-2">Add Message</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ChatToAdmin