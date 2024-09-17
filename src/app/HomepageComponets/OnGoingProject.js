import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CreateProjectForm from './Create_project_form';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function OnGoingProject({ handleTaskId }) {
  const [projects, setProjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false); 
  const [load, setLoad] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const setTaskid = (taskid) => {
    console.log(taskid);
    handleTaskId(taskid);
  };


  useEffect(() => {
    fetchProjects();
  }, [load]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://projectserver-app.onrender.com/get_all_project'); // Replace with your backend endpoint
      setProjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProject = async (projectId) => {
    console.log(projectId)
    try {
      const response = await axios.delete("https://projectserver-app.onrender.com/DeleteProjectBy", {
        data: { projectid: projectId }
      });
      if (response) {
        setLoad(!load)
        alert("Deleted", response.data);
      }
    } catch (error) {
      console.error("There was an error deleting the project:", error);
    }
  };

  const handlePopupToggle = () => {
    setShowPopup(true);

  }
  const handleProjectView = (id) => {
    // Use the router object from next/navigation
    router.push(`/ProjectDetailsPage?projectId=${id}`);
  };
  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow-lg'>

      <div className='flex justify-between items-center p-4 bg-blue-600 text-white rounded-lg'>
        <div className='text-lg font-semibold'>Project Title</div>
        <button
          className='flex items-center bg-green-500 hover:bg-green-600 p-2 rounded-lg'
          onClick={handlePopupToggle}
        >
          <h3 className='text-sm'>Create New Project</h3>
          <Image className='ml-2' src={require("../Assests/plus.png")} alt='plusicon' width={20} />
        </button>
      </div>


      <div className='overflow-y-auto h-60 mt-4'>
        {projects.map((project) => (
          <div
            key={project.id}
            className='flex justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-md hover:bg-gray-100'
            onClick={() => setTaskid(project.id)}
          >
            <div className='text-gray-800 font-medium'>
              {project.projectName}<br/>
              <div onClick={()=>{
                handleProjectView(project.id);
              }}>
              <a className='text-sm text-blue-500 cursor-pointer'>View Project Details</a>
              </div>
           
              </div>
            <div className='flex items-center'>
              <Image src={require('../Assests/arrows.png')} alt='arrow' width={20} />
              <button
                className='ml-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg'
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(project.id);
                }}
              >
                <Image src={require("../Assests/trash-bin.png")} alt='trash' width={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <CreateProjectForm fetchTask={fetchProjects}/>
      )}


    </div>

  );
}
