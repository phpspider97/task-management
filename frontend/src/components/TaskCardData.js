import React from 'react'
import DashboardCard from '../hoc/DashboardCard.js'
const TaskCardData = ({text,value,color}) => {
    return (
        <div className="col-md-3 text-center">
            <div className={`alert alert-${color} p-4`} role="alert">
                {text} <sup><span className="analysis-circle">{value} &nbsp;</span></sup>
            </div>
        </div> 
    )
}
export default DashboardCard(TaskCardData)