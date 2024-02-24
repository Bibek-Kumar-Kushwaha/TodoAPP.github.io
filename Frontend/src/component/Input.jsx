// Input.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Task from './Task';

export default function Input() {
  const {id} = useParams;
  const [newTask, setNewTask] = useState({ title: '', note: '' });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/tasks', newTask);
      console.log('Task added successfully:', response.data);
      setTasks([...tasks, response.data]); // Add new task to tasks array
      setNewTask({ title: '', note: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`);
      // Update tasks state by filtering out the deleted task
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/tasks/${id}`);
     // setTasks(tasks.filter(task => task._id == id));
      console.log("Update task with id:", id);
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
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            className="w-full h-24 mb-4 px-4 py-2 rounded-md resize-none border border-gray-300 focus:outline-none focus:border-blue-500 font-semibold"
            placeholder="Enter Note"
            value={newTask.note}
            onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-300 font-bold text-xl"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
      </div>
      <div className="">
        <Task tasks={tasks} onDeleteTask={handleDeleteTask} onUpdateTask={handleUpdateTask}/>
      </div>
    </>
  );
}
