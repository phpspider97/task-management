import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Top = () => {
    const navigate = useNavigate() 
    const totalNotification = useSelector(state=>state.notificationCount.value)
   
    const logOut = () => {
        sessionStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className="top-container sticky-top row">
            <div className="col-md-6 mt-2">
                <span className="col-md-6 mt-2"> &nbsp;&nbsp; Welcome : <b>Neelmani</b> <i className="fa-regular fa-pen-to-square show-only-pointer" onClick={()=>{navigate('/edit-profile')}}></i> </span>
            </div>
            <div className="col-md-5 text-end mt-2">
                <Link to="/incoming-task" className="show-only-pointer">
                    Notification <sup><span className="analysis-circle">{totalNotification} &nbsp;</span></sup>
                </Link> 
            </div>
            <div className="col-md-1 text-end mt-2"> 
                <button className="btn btn-danger btn-sm" onClick={logOut}>Logout</button>&nbsp;&nbsp;
            </div>
        </div>
    )
}
export default Top