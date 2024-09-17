import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function CompletedTasks({refreshStatus}) {
const [CompletedTasks,setCompletedTask] = useState();
const [load,setLoad] = useState(false);

useEffect(()=>{
    const getCompletedTask=async ()=>{
        const response = await axios.get("https://projectserver-app.onrender.com/get_all_Completed");
        if(response){
            setCompletedTask(response.data);
        }
    }
    getCompletedTask();
},[load,refreshStatus]);


const deleteTask = async (taskid) => {
  try {
    const response = await axios.delete("https://projectserver-app.onrender.com/deleteByid", {
      data: { taskId: taskid }
    });
    console.log(response.data);
    setLoad(!load);
    alert("The Task is Deleted")
  } catch (error) {
    console.error("There was an error deleting the task:", error);
  }
};

if(!CompletedTasks){
    return (
        <div>
            <h1>No data found</h1>
        </div>
    )
}
  return (
    <div className='text-center rounded-lg'>
      <h1 className='text-2xl font-bold p-2 '>Completed Tasks</h1>
      <div className='bg-gray-800 text-white flex justify-around p-2  grid grid-cols-8'>
        <h1 className='col-span-1'>S.NO</h1>
        <h1 className='col-span-2'>Task Name</h1>
        <h1 className='col-span-2'>Completed By</h1>
        <h1 className='col-span-2'>Completed On</h1>
        <button>
          Refresh
        </button>
      </div>
      <div>
        {CompletedTasks.map((task, index) => (
          <div 
            key={index} 
            style={{ backgroundColor: index % 2 !== 0 ? "#353a43" : null }}
            className='bg-gray-700 text-white flex justify-around p-2 grid grid-cols-8'
          >
            <h1 className='col-span-1'>{index + 1}</h1>
            <h1 className='col-span-2' >{task.taskName}</h1>
            <h1 className='col-span-2'>{task.taskCompletedBy}</h1>
            <h1 className='col-span-2'>{task.tasKCompletedOn}</h1>
            <button className='col-span-1'
            onClick={()=>{
              deleteTask(task.id);
            }}
            >
                <Image src={require("../Assests/trash-bin.png")}alt='trash' width={15}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
