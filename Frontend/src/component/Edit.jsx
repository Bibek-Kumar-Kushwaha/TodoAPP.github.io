import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
export default function Edit() {


  const { id } = useParams();
  const [input, setInput] = useState({ title: '', note: '' });
  const [tasks, setTasks] = useState({ title: '', note: '' }); 
  
  useEffect(() => {
    // Fetch previous tasks when component mounts
    fetchTasks();
}, []);

const fetchTasks = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/tasks');
        setTasks(response.data);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
    }
};

const handleUpdateTask = async () => {
  try {
    await axios.put(`http://localhost:8000/api/tasks/${id}`, input);
    console.log("Updated task with id:", id);
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

  return (
    <div className="w-full">
      <div className="bg-gray-100 rounded-xl p-4 mb-4 shadow-md">
        <input
          type="text"
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 font-bold"
          placeholder="Enter Title"
          value={input.title}
          
          onChange={(e) => setInput({ ...input, title: e.target.value })}
        />
        <textarea
          className="w-full h-24 mb-4 px-4 py-2 rounded-md resize-none border border-gray-300 focus:outline-none focus:border-blue-500 font-semibold"
          placeholder="Enter Note"
          value={input.note}
          onChange={(e) => setInput({ ...input, note: e.target.value })}
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-300 font-bold text-xl mb-2"
          onClick={handleUpdateTask}
        >
          UPDATE
        </button>
        <button
          type="submit"
          className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-300 font-bold text-xl"
        >
          <Link to='/'>
            BACK TO HOME
          </Link>
        </button>
      </div>
    </div>
  );
}
