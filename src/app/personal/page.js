'use client';
import React, { useState } from 'react';
import { FaCheckCircle, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

const TodoPage = () => {
  // State for tasks and new task input
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Finish Next.js project', completed: false, completedOn: null },
    { id: 2, name: 'Update resume', completed: true, completedOn: '2024-09-14' },
  ]);
  const [newTask, setNewTask] = useState('');

  // Handlers for task actions
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, name: newTask, completed: false, completedOn: null }
      ]);
      setNewTask('');
    }
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: true, completedOn: new Date().toISOString().split('T')[0] } : task
    ));
  };

  const handleUpdateTask = (id) => {
    const updatedName = prompt('Update task name:');
    if (updatedName) {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, name: updatedName } : task
      ));
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">To-Do List</h1>
        
        {/* Task Creation */}
        <div className="mb-6 flex items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border rounded-l-lg p-2 flex-1"
            placeholder="New task..."
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center hover:bg-blue-700"
          >
            <FaPlus className="mr-2" /> Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4 mb-8">
          {tasks.map(task => (
            <div key={task.id} className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between">
              <div className="flex-1">
                <h2 className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.name}
                </h2>
                {task.completed && (
                  <p className="text-sm text-gray-500">Completed on: {task.completedOn}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {!task.completed && (
                  <>
                    <button onClick={() => handleCompleteTask(task.id)} className="text-green-600 hover:text-green-700">
                      <FaCheckCircle />
                    </button>
                    <button onClick={() => handleUpdateTask(task.id)} className="text-blue-600 hover:text-blue-700">
                      <FaEdit />
                    </button>
                  </>
                )}
                <button onClick={() => handleDeleteTask(task.id)} className="text-red-600 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Completed Tasks</h2>
          {tasks.filter(task => task.completed).length === 0 && (
            <p className="text-gray-500">No completed tasks yet.</p>
          )}
          {tasks.filter(task => task.completed).map(task => (
            <div key={task.id} className="bg-gray-200 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold">{task.name}</h3>
              <p className="text-sm text-gray-600">Completed on: {task.completedOn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
