import React,{ useEffect, useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import LeftBar from './common/LeftBar' 
import { useForm } from 'react-hook-form'
import {io} from "socket.io-client"
const socket = io("http://localhost:3004")

const SpeechToText = () => {
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
    
    const speakNow = () => { 
        if ('speechSynthesis' in window) {
            var msg = new SpeechSynthesisUtterance()
            msg.text = 'Hello, how are you today?'
            msg.volume = 0.5; // 0 to 1
            msg.rate = 1; // 0.1 to 10
            msg.pitch = 1; //0 to 2 
            var voices = window.speechSynthesis.getVoices()
            msg.voice = voices[0]
            window.speechSynthesis.speak(msg)
        }else{
            console.error('Speech synthesis not supported in this browser.');
        }
    } 
    return (
        <div className="row"> 
            <div className="col-md-2">
                <LeftBar />
            </div>
            <div className="col-md-10"> 
                <div className="form-container">
                    <h3><u>Speech To Text</u></h3><br /> 
                    <textarea rows="10" className="form-control" placeholder="Enter Speak Message..." disabled/>
                    {errors.message && <span className="error-message">This field is required</span>}
                    <button type="submit" className="btn btn-secondary w-100 mt-2" onClick={speakNow}>Click To Speak</button>
                </div> 
            </div>
        </div>
    )
}
export default SpeechToText