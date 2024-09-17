import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

export default function CreateProjectForm({fetchTask}) {
  // Define state variables for form fields
  const [projectName, setProjectName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  // Define project status options
  const projectStatusOptions = ['Pre-plan', 'Planned', 'Budget', 'UI Design', 'Pre-code 1', 
    'Pre-release 1', 'Testing', 'Backend Started', 'Deployed', 'In Maintenance'];

  // Handle field changes
  const handleNameChange = (e) => setProjectName(e.target.value);
  const handleDeadlineChange = (e) => setDeadline(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleOwnerChange = (e) => setOwner(e.target.value);
  const handleStatusChange = (e) => setProjectStatus(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data to be sent to the backend
    const projectData = {
      projectName,
      projectDescription: description,
      projectDeadline: deadline,
      projectOwner: owner,
      projectStatus,
    };

    try {
      // Send data to the backend
      await axios.post('https://projectserver-app.onrender.com/create_project', projectData);
      // Handle successful response
      alert('Project created successfully');
      // Clear form fields or close the popup
      setProjectName('');
      setDeadline('');
      setDescription('');
      setOwner('');
      setProjectStatus('');
      fetchTask();
      setIsPopupOpen(false);
    } catch (error) {
      // Handle error response
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };


  const handlePopupToggle = () => setIsPopupOpen(!isPopupOpen);

  if (!isPopupOpen) return null; // Hide the component if popup is closed

  return (
    <div>
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='bg-white p-8 rounded-lg w-3/4 h-3/4 relative'>
          <h2 className='text-xl font-bold mb-4'>Create New Project</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Project Name'
              className='border p-2 mb-4 w-full'
              value={projectName}
              onChange={handleNameChange}
              required
            />
            <label>Deadline</label>
            <input
              type='date'
              className='border p-2 mb-4 w-full'
              value={deadline}
              onChange={handleDeadlineChange}
              required
            />
            <label>Project Description</label>
            <input
              type='text'
              placeholder='Project Details'
              className='border p-2 mb-4 w-full'
              value={description}
              onChange={handleDescriptionChange}
              required
            />
            <label>Project Owner</label>
            <input
              type='text'
              placeholder='Project Owner'
              className='border p-2 mb-4 w-full'
              value={owner}
              onChange={handleOwnerChange}
              required
            />
            <label>Project Status</label>
            <select
              value={projectStatus}
              onChange={handleStatusChange}
              className='border p-2 mb-4 w-full'
              required
            >
              <option value='' disabled>Select Project Status</option>
              {projectStatusOptions.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
            <button
              type='submit'
              className='bg-green-500 p-2 text-white rounded-lg'
            >
              Submit
            </button>
            <button
              type='button'
              className='absolute top-2 right-2 bg-red-500 p-2 text-white rounded-lg'
              onClick={handlePopupToggle}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
