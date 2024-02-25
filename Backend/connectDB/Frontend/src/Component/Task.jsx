import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Task(props) {
  const { data, onDelete } = props;

  const handleDelete = (id) => {
    onDelete(id);
  };

  // Map over the data array if it exists
  const taskItems = data.map((item, index) => (
    <div key={index} className="bg-gray-200 rounded-xl p-4 flex justify-between items-center mb-4 shadow-md">
      <div className="flex-1">
        <div className="text-xl font-bold uppercase mb-1">{item.title}</div>
        <div className="text-base">{item.note}</div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-green-600 text-2xl hover:text-green-700 focus:outline-none">
          <Link to={`Edit/${item._id}`} >
            <FaEdit />
          </Link>
        </button>
        <button className="text-red-600 text-2xl hover:text-red-700 focus:outline-none" onClick={() => handleDelete(item._id)}>
          <MdDelete />
        </button>
      </div>
    </div>
  ));

  return (
    <div className="w-full max-w-xl mx-auto">
      {taskItems}
    </div>
  );
}
