import React, { useState, useEffect } from 'react';
import Task from './Task';
import axios from 'axios';

export default function Input() {
    const [input, setInput] = useState({ title: '', note: '' });
    const [tasks, setTasks] = useState([]); // State to store tasks

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

    const handlerAddTask = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/tasks', input);
            console.log('Task added successfully:', response.data);
            // Add the newly created task to the tasks array
            setTasks([...tasks, response.data]);
            setInput({ title: '', note: '' });
        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };

    const handlerDeleteTask = async (id) => {
      try {
          await axios.delete(`http://localhost:8000/api/tasks/${id}`);
          setTasks(tasks.filter(task => task._id !== id));

      } catch (error) {
          console.error('Error adding task:', error.message);
      }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/tasks/${id}`, updatedData);
      // Assuming response.data contains the updated task data, you might want to use it to update the tasks array
      // For example, you can replace the existing task with the updated task in the tasks array
      const updatedTask = response.data;
      setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
      console.log("Updated task with id:", id);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  

    return (
        <>
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
                        className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-300 font-bold text-xl"
                        onClick={handlerAddTask}
                    >
                        Add
                    </button>
                </div>
            </div>
            <div className="">
                {/* Pass the tasks array as data to the Task component */}
                <Task data={tasks} onDelete={handlerDeleteTask} onUpdate={handleUpdateTask}/>
            </div>
        </>
    );
}
