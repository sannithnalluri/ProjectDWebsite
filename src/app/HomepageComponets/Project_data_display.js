import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import refresh from '../Assests/refresh.png'

export default function Project_data_display({HandleTaskUpdate,TaskStatus}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateProjectId, setUpdateProjectId] = useState(null);
  const [showUpdateScreen,setUpdateScreen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [TaskStatus]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://projectserver-app.onrender.com/getAllTasks'); // Replace with your backend endpoint
      setProjects(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDoneTask = async (task) => {
    console.log(task);
    const currentData = new Date();
    const formattedDate = `${currentData.getDate().toString().padStart(2, '0')}-${(currentData.getMonth() + 1).toString().padStart(2, '0')}-${currentData.getFullYear()}`;
    
    const data = {
        id: task.id,
        taskName: task.taskName,
        taskCompletedBy: task.taskAssigned,
        tasKCompletedOn: formattedDate // Converts date to dd-mm-yyyy format
    };
    console.log(data);
    try {
        const response = await axios.post("https://projectserver-app.onrender.com/UploadCompletedTask", data);
        if (response) {
            console.log(response.data);
            fetchProjects();
            HandleTaskUpdate();
        }
    } catch (e) {
        console.log(e);
    }
};


  const handleUpdateClick = (projectId) => {
    console.log(projectId);
    setUpdateScreen(true);
    setUpdateProjectId(projectId);

  };

  const handleCloseUpdateForm = () => {
    setUpdateProjectId(null);
  };

  if (loading) {
    return (
      <div>
        Loading...
        <div className='flex justify-end mt-4'>
          <button 
            className='bg-orange-500 p-3 rounded-xl'
            onClick={fetchProjects}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error loading projects: {error.message}
        <div className='flex justify-end mt-4'>
          <button 
            className='bg-orange-500 p-3 rounded-xl'
            onClick={fetchProjects}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
<div className='bg-gray-900 py-3 rounded-lg'>
  <div className='bg-gray-800 text-white mx-8 my-2 p-4 grid grid-cols-12 gap-4 rounded-lg'>
    <div className='col-span-3 font-bold'>Task Name</div>
    <div className='col-span-3'>Task Assigned</div>
    <div className='col-span-2'>Task Status</div>
    <div className='col-span-2'>Task Deadline</div>
    <button 
  className='col-span-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-2 flex items-center justify-center'
  onClick={fetchProjects}
  style={{ width: '40px', height: '40px' }}
>
  <Image src={refresh} alt='refresh' width={20} height={20} />
</button>
  </div>
  <div className='overflow-y-auto h-60'>
    {projects.map((project) => (
      <div key={project.id} className='bg-gray-700 text-white mx-8 my-2 p-4 grid grid-cols-12 gap-4 rounded-lg hover:bg-gray-600'>
        <div className='col-span-3'>{project.taskName}</div>
        <div className='col-span-3'>{project.taskAssigned}</div>
        <div className='col-span-2'>{project.taskStatus}</div>
        <div className='col-span-2'>{project.taskDeadline}</div>
        <div className='col-span-1'>
          <button
            className='bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-sm'
            onClick={() => handleUpdateClick(project.id)}
          >
            Update
          </button>
        </div>
        <div className='col-span-1'>
          <button
            className='bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-sm'
            onClick={() => handleDoneTask(project)}
          >
            Done
          </button>
        </div>
      </div>
    ))}
  </div>

  {showUpdateScreen && updateProjectId && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl h-full max-h-screen overflow-auto relative">
        <button
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleCloseUpdateForm}
        >
          Close
        </button>
        {/* Update form content goes here */}
      </div>
    </div>
  )}
</div>


  );
}
