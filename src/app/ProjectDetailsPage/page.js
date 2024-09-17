'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FaEdit, FaPlus, FaRegCalendarAlt, FaDollarSign, FaTasks, FaCheckCircle, FaProjectDiagram } from 'react-icons/fa';
import TaskOfProject from '../HomepageComponets/TaskOfProject';

// Fallback UI component during Suspense
const Loading = () => <div>Loading project details...</div>;

export default function ProjectDetailsPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');

  // Dummy Data
  const project = {
    name: "CampusConnect",
    status: "Pre-Planning",
    nextStage: "Design",
    budget: "50,000",
    deadline: "20-09-2025",
    stack: "Next.js, SpringBoot",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ownershipDetails: "John Doe, Jane Smith",
    assets: "Design Mockups, Project Plan",
    expenditure: "30,000",
    currentTasks: "Task 1, Task 2",
    completedTasks: "Completed Task 1, Completed Task 2"
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Project Details</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
            <FaEdit className="mr-2" /> Update Details
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-red-600 text-white p-6 rounded-lg flex flex-col items-center">
            <FaRegCalendarAlt className="text-4xl mb-2" />
            <h3 className="text-lg font-semibold">Project Status</h3>
            <h1 className="text-2xl font-bold mt-2">{project.status}</h1>
            <h3 className="text-lg mt-4">Next Stage</h3>
            <h1 className="text-2xl font-bold">{project.nextStage}</h1>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-lg flex flex-col items-center">
            <FaDollarSign className="text-4xl mb-2" />
            <h2 className="text-lg font-semibold">Budget</h2>
            <h1 className="text-3xl font-bold mt-2">{project.budget}</h1>
          </div>
          <div className="bg-blue-600 text-white p-6 rounded-lg flex flex-col items-center">
            <FaRegCalendarAlt className="text-4xl mb-2" />
            <h3 className="text-lg font-semibold">Project Deadline</h3>
            <h2 className="text-2xl font-bold mt-2">{project.deadline}</h2>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded-lg flex flex-col items-center">
            <FaProjectDiagram className="text-4xl mb-2" />
            <h3 className="text-lg font-semibold">Project Stack</h3>
            <h2 className="text-2xl font-bold mt-2 text-center">{project.stack}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-700 font-medium">Project Name:</span>
              <span className="text-gray-900 font-semibold">{project.name}</span>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg col-span-2">
              <h2 className="text-gray-700 font-medium mb-2">Project Description:</h2>
              <p className="text-gray-900">{project.description}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-700 font-medium">Ownership Details:</span>
              <span className="text-gray-900 font-semibold">{project.ownershipDetails}</span>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-700 font-medium">Assets:</span>
              <span className="text-gray-900 font-semibold">{project.assets}</span>
              <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center">
                <FaPlus className="mr-1" /> Add
              </button>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg max-h-16 flex justify-between items-center">
              <span className="text-gray-700 font-medium">Budget Expenditure:</span>
              <span className="text-gray-900 font-semibold">{project.expenditure}</span>
              <button className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 flex items-center">
                <FaEdit className="mr-1" /> Edit
              </button>
            </div>
            <div className="p-4 rounded-lg flex justify-between items-center">
              <Suspense fallback={<Loading />}>
                <TaskOfProject projectId={projectId} />
              </Suspense>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-700 font-medium">Completed Tasks:</span>
              <span className="text-gray-900 font-semibold">{project.completedTasks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
