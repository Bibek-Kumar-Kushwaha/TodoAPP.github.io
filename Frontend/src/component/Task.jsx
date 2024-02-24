import React from 'react';
import { MdDelete } from 'react-icons/md';

export default function Task({ tasks, onDeleteTask}) {

  return (
    <div className="w-full max-w-xl mx-auto">
      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-200 rounded-xl p-4 flex justify-between items-center mb-4 shadow-md">
          <div className="flex-1">
            <div className="text-xl font-bold uppercase mb-1">{task.title}</div>
            <div className="text-base">{task.note}</div>
          </div>
          <div className="flex items-center space-x-4">

            <button
              className="text-red-600 text-2xl hover:text-red-700 focus:outline-none"
              onClick={() => onDeleteTask(task._id)}
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
