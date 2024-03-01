import React from 'react'
import { Link } from 'react-router-dom'
const LeftBar = () => {
    return (
        <div className="left-bar">
            <ul className="list-group">
                <li className="list-group-item"><Link to='/dashboard' className="link-style">Dashboard</Link></li>
                <li className="list-group-item bg-secondary text-white"><b>Task</b></li>
                <li className="list-group-item"> - <Link to='/add-task' className="link-style">Add Task</Link></li>
                <li className="list-group-item"> - <Link to='/manage-task' className="link-style">Manage Task</Link></li> 
                <li className="list-group-item bg-secondary text-white"><b>Chat</b></li>
                <li className="list-group-item"> - <Link to='/chat-to-admin' className="link-style">Message to Admin</Link></li> 
            </ul>
        </div>
    )
}
export default LeftBar