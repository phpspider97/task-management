import React, { useState, useEffect } from 'react'
import LeftBar from './common/LeftBar'
import { useAnalysisTaskQuery } from '../redux/api/TaskApi.js'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import TaskCardData from './TaskCardData.js' 

const Dashboard = () => {  
    const [optionPieChartData, setOptionPieChartData ] = useState([])
    const [optionBarChartData, setOptionBarChartData ] = useState([])
    const [totalActiveTask, setTotalActiveTask ] = useState(0)
    const [totalInactiveTask, setTotalInactiveTask ] = useState(0)
    const [totalTask, setTotalTask ] = useState(0)
    const {data:getTaskAnalysisData, error, isLoading} = useAnalysisTaskQuery()
  
    useEffect(()=>{
        const pieChartOption = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Active Task Status'
            },
            series: [
                {
                    name: 'Active Status',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Active',
                            y: getTaskAnalysisData?.data?.totalActiveTask
                        },
                        {
                            name: 'In-active',
                            y: getTaskAnalysisData?.data?.totalTask-getTaskAnalysisData?.data?.totalActiveTask
                        }
                    ]
                }
            ]
        }
        const barChartOption = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Task added (Week wise summary)'
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of task'
                }
            },
            series: [{
                name: "Day's of week",
                colors: [
                    '#e2e3e5'
                ],
                colorByPoint: true,
                groupPadding: 0,
                data: [
                    ['Tokyo', 37.33],
                    ['Delhi', 31.18],
                    ['Shanghai', 27.79], 
                ],
                
            }]
        }
        setOptionPieChartData(pieChartOption)  
        setOptionBarChartData(barChartOption)  
        setTotalActiveTask(getTaskAnalysisData?.data?.totalActiveTask)      
        setTotalTask(getTaskAnalysisData?.data?.totalTask)    
        setTotalInactiveTask(getTaskAnalysisData?.data?.totalTask-getTaskAnalysisData?.data?.totalActiveTask)  
    },[getTaskAnalysisData]) 
    return (    
        <div className="row"> 
            <div className="col-md-2">
                <LeftBar />
            </div>
            <div className="col-md-10">
                <div className="row">   
                    <TaskCardData text='Total Task' value={totalTask} />
                    <TaskCardData text='Total Active Task' value={totalActiveTask} />
                    <TaskCardData text='Total Inactive Task' value={totalInactiveTask} />
                    <TaskCardData text='Total Completed Task' value={0} />
                     
                    <div className="col-md-6">
                        <div className="alert alert-secondary p-4" role="alert"> 
                            <HighchartsReact highcharts={Highcharts} options={optionPieChartData} />
                        </div>
                    </div> 
                    <div className="col-md-6">
                        <div className="alert alert-secondary p-4" role="alert"> 
                            <HighchartsReact highcharts={Highcharts} options={optionBarChartData} />
                        </div>
                    </div> 
                </div> 
            </div>
        </div>
    )
}
export default Dashboard