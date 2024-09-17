import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Create_New_Task from './Create_New_Task';

export default function TaskOfProject({ projectId, HandleTaskUpdate }) {
  const [showPopup, setShowPopup] = useState(false);
  const [project, setProject] = useState(null);
  const [projectData, setProjectData] = useState([]);

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleCloseUpdateForm = (e) => {
    HandleTaskUpdate();
    setShowPopup(false);
  };

  const fetchProject = useCallback(async () => {
    if (!projectId) {
      console.error('Project ID is null or undefined');
      return;
    }
    try {
      const response = await axios.get(`https://projectserver-app.onrender.com/getProjectById/${projectId}`);
      setProject(response.data);
    } catch (err) {
      console.error('Error fetching project:', err);
    }
  }, [projectId]);

  const fetchTask = useCallback(async () => {
    if (!projectId) {
      console.error('Project ID is null or undefined');
      return;
    }
    try {
      const response = await axios.get(`https://projectserver-app.onrender.com/getTaskByProjectId/${projectId}`);
      setProjectData(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject, showPopup]);


  useEffect(() => {
    fetchTask();
  }, [fetchTask, HandleTaskUpdate]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow-lg'>
      <div className='flex justify-between items-center max-h-48 bg-gray-800 text-white rounded p-4'>
        <h1 className='text-xl font-semibold'>The Task of <br />{project.projectName}</h1>
        <button className='bg-blue-500 hover:bg-blue-600 p-2 text-white rounded-lg' onClick={handlePopupToggle}>
          Create New Task
        </button>
      </div>
      <div className='max-h-72 overflow-y-auto mt-4'>
        {/* Task list */}
        {Array.isArray(projectData) && projectData.map((task) => (
          <div key={task.id} className="p-4 rounded-lg text-gray-800 flex justify-between items-center bg-white m-2 shadow-md hover:bg-gray-100">
            <h1 className='font-medium'>{task.taskName}</h1>
            <h2 className='text-sm'>{task.taskStatus}</h2>
            <h3 className='text-sm'>{task.taskDeadline}</h3>
          </div>
        ))}
      </div>

      {/* Popup Screen */}
      {showPopup && (
        <Create_New_Task project={project.projectName} projectId={projectId} PopcallBack={handleCloseUpdateForm} />
      )}
    </div>
  );
}
