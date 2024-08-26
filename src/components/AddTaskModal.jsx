import React, { useState } from 'react';
import close_icon from "../assets/icons8-close.svg";

function AddTaskModal({ show, onClose, onAdd }) {
  // State to hold the title of the task
  const [title, setTitle] = useState('');
  
  // State to hold the description of the task
  const [description, setDescription] = useState('');
  
  // State to hold the deadline of the task
  const [deadline, setDeadline] = useState('');
  
  // State to hold the status of the task (default is 'TODO')
  const [status, setStatus] = useState('TODO');

  // If the modal should not be shown, return null to render nothing
  if (!show) return null;

  // Function to handle adding the task when the button is clicked
  const handleAddClick = () => {
    // Check if all fields are filled
    if (title && description && deadline) {
      // Call the onAdd function passed as a prop with the new task details
      onAdd({ title, description, deadline, status });
      // Clear form fields after adding task
      setTitle('');
      setDescription('');
      setDeadline('');
      setStatus('TODO');
    } else {
      // Show an alert if any field is empty
      alert('Please fill in all fields.');
    }
  };

  // Function to determine the border and text color based on task status
  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO':
        return 'border-yellow-500 text-yellow-500';
      case 'DOING':
        return 'border-orange-500 text-orange-500';
      case 'DONE':
        return 'border-green-500 text-green-500';
      default:
        return 'border-gray-500 text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 overflow-auto">
      <div className="bg-[#E0FBE2] p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Add New Task
          <button
            onClick={onClose} // Close the modal when the button is clicked
            className="p-2 rounded-md"
          >
            <img className='w-4 h-6 cursor-pointer' src={close_icon} alt="Close" />
          </button>
        </h2>
        <div className="mb-4">
          <label className="block text-base font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state on input change
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-base font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state on input change
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-base font-medium mb-1">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)} // Update deadline state on input change
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-base font-medium mb-1">Status</label>
          <div className="flex flex-wrap gap-4 pb-2">
            <div className={`flex items-center ${getStatusColor("TODO")}`}>
              <input
                type="radio"
                value="TODO"
                checked={status === 'TODO'}
                onChange={(e) => setStatus(e.target.value)} // Update status state on radio button change
                className="mr-2"
              />
              <label>TODO</label>
            </div>
            <div className={`flex items-center ${getStatusColor("DOING")}`}>
              <input
                type="radio"
                value="DOING"
                checked={status === 'DOING'}
                onChange={(e) => setStatus(e.target.value)} // Update status state on radio button change
                className="mr-2"
              />
              <label>DOING</label>
            </div>
            <div className={`flex items-center ${getStatusColor("DONE")}`}>
              <input
                type="radio"
                value="DONE"
                checked={status === 'DONE'}
                onChange={(e) => setStatus(e.target.value)} // Update status state on radio button change
                className="mr-2"
              />
              <label>DONE</label>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddClick} // Trigger add task when button is clicked
            className="bg-[#AF47D2] text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
