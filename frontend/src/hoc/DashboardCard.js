import React from 'react'

const DashboardCard = (OldComponent) => {
    return function(props){ 
        let color = (props.value>2)?'primary':'secondary'
        let updateProps = {...props,color}
        return (  
            <OldComponent {...updateProps} />
        )
    } 
}
export default DashboardCard