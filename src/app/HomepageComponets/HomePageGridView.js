import React, { useState } from 'react';
import TaskOfProject from './TaskOfProject';
import Create_project_form from './Create_project_form';
import Project_data_display from './Project_data_display';
import OnGoingProject from './OnGoingProject';
import Image from 'next/image';
import CompletedTasks from './CompletedTasks';

export default function HomePageGridView() {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [projectStatus, setProjectStatus] = useState('');
  const [taskid, setTaskId] = useState('');
  const [refreshTask, setrefreshTask] = useState(false);

  const [selectedTaskId, setSelectedTaskId] = useState(null);


  const handleTaskId = (id) => {
    setSelectedTaskId(id);
    console.log('Selected Task ID:', id);
  };

  if (selectedTaskId) {
    console.log(taskid);
  }


  const handleStatusChange = (event) => {
    setProjectStatus(event.target.value); // Update project status when changed
  };


  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
    // Toggle popup visibility
  };

  const handleRefresh = () => {
    setrefreshTask(!refreshTask);
  }

  return (
    <>
    <div className='mt-16 rounded-lg grid grid-cols-12 grid-rows-12 gap-5 '>
      <div className='bg-white col-span-8 row-span-1 ml-24 rounded-lg text-center flex justify-center'>
        <h1 className='font-bold text-2xl mt-3'>Task Manager</h1>
      </div>


      <div className='bg-white col-span-12 row-span-5 max-h-96 overflow-y-auto rounded-lg'>
        <Project_data_display fetchTask={handleRefresh} taskStatus={refreshTask} />
      </div>

      <div className='bg-white row-span-4 col-span-6 rounded-lg text-center '>
        <div className='flex justify-around bg-gray-800 p-2 grid grid-cols-12 m-2 text-white rounded-lg'>
          <div className='col-span-4 my-2'>Project Title</div>
          <div className='col-span-3 my-2'>Project Deadline</div>
          <button
            className='col-span-5 mx-2 bg-blue-500 p-2 w-fit text-white rounded-lg flex'
            onClick={handlePopupToggle} // Toggle popup on click
          >
            <h3 className='text-sm my-1'>Create New Project</h3>
            <Image className='mx-2 my-1' src={require("../Assests/plus.png")} alt='plusicon' width={20} />
          </button>
        </div>
        <OnGoingProject taskId={handleTaskId} fetchTask={handleRefresh} />

      </div>

      <div className='bg-white row-span-4 p-2 col-span-6 rounded-lg text-center'>
        {<TaskOfProject projectId={selectedTaskId} fetchTask={handleRefresh} />}

      </div>
      {showPopup && (
        <Create_project_form />
      )}
    </div>
    <CompletedTasks refreshStatus={refreshTask} />
    </>
  );
}
