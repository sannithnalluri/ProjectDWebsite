import axios from 'axios';
import React, { useState } from 'react';

export default function Create_New_Task({ project,projectId,PopcallBack}) {
  const [taskName, setTaskName] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskAssigned, setTaskAssigned] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const projectStatusOptions = ['Not Started', 'In Progress', 'Completed'];

  const handleStatusChange = (e) => {
    setTaskStatus(e.target.value);
  };

  const handlePopupToggle = () => {
    PopcallBack();
  };

  const handleSubmit = async() => {

    alert(projectId);

    const newTask = {
        taskName,
        taskDeadline,
        taskAssigned,
        taskStatus,
        projectId: projectId,
      };
  
      try {
        const response = await axios.post('https://projectserver-app.onrender.com/Create_Task', newTask);
        alert('Task created successfully:', response.data);
        // Optionally, close the popup or reset the form here
        handlePopupToggle();
      } catch (error) {
        console.error('Error creating task:', error);
      }
  };

  return (
    <div>
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-lg'>
          <h2 className='text-xl font-bold'>Create New Task of {project}</h2>
          <input
            type='text'
            placeholder='Task Name'
            className='border p-2 mt-4 mb-4 w-full'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type='date'
            className='border p-2 mb-4 w-full'
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
          />
          <select
            value={taskStatus}
            onChange={handleStatusChange}
            className='border p-2 mb-4 w-full'
            required
          >
            <option value='' disabled>Select Project Status</option>
            {projectStatusOptions.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
          <input
            type='text'
            placeholder='Task Assigned'
            className='border p-2 mt-4 mb-4 w-full'
            value={taskAssigned}
            onChange={(e) => setTaskAssigned(e.target.value)}
          />
          <button
            className='bg-green-500 p-2 text-white rounded-lg'
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className='bg-red-500 p-2 text-white rounded-lg ml-4'
            onClick={handlePopupToggle}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
