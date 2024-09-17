'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react';
import logoicon from '../Assests/logoicon.png';
import Dashboard from '../Assests/dashboard.png';
import document from '../Assests/document.png';
import idea from '../Assests/idea.png';
import savemoney from '../Assests/save-money.png';
import selfservice from '../Assests/self-service.png';
import SideNavbar from './SideNavbar';
import Homepage_ProjectViewer from '../HomepageComponets/Homepage_ProjectViewer';
import Project_data_display from '../HomepageComponets/Project_data_display';
import OnGoingProject from '../HomepageComponets/OnGoingProject';
import TaskOfProject from '../HomepageComponets/TaskOfProject';
import CompletedTasks from '../HomepageComponets/CompletedTasks';

export default function Homepage() {
    const [taskId,setTaskId] = useState('');
    const [refreshTask,setrefreshTask] = useState(false);

    const handleTaskId=(id)=>{
            setTaskId(id);
    }

    const handleRefresh=()=>{
        setrefreshTask(!refreshTask)
    }


  return (
<div  className="flex  grid grid-cols-2 gap-2">
    <div className=' col-span-2 p-5'>
        <Project_data_display HandleTaskUpdate={handleRefresh} TaskStatus={refreshTask}/>
    </div>
    <div className='p-5 m-4 rounded'>
        <OnGoingProject handleTaskId={handleTaskId} />
    </div>
    <div className=' p-5 '>
        <TaskOfProject projectId={taskId} HandleTaskUpdate={handleRefresh} />
    </div>
    <div className='bg-blue-300 col-span-2 p-5'>
        <CompletedTasks refreshStatus={refreshTask}/>
    </div>
</div>

  
  )
}
