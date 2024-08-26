import React, { useState, useEffect } from 'react';
import close_icon from "../assets/icons8-close.svg";
import ModalTask from './ModalTask';

// SearchModal component for searching and selecting tasks
function SearchModal({ show, onClose, tasks, onSearchQueryChange, onEditTaskModal, onDelete }) {
  // State to hold the local search query
  const [localQuery, setLocalQuery] = useState('');
  // State to hold the currently selected task
  const [selectedTask, setSelectedTask] = useState(null);

  // Effect to clear the search query when the modal is shown
  useEffect(() => {
    if (show) {
      setLocalQuery('');
    }
  }, [show]);

  // Return null if 'show' is false to hide the modal
  if (!show) return null;

  // Function to handle changes in the search input field
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalQuery(query); // Update local query state
    onSearchQueryChange(query); // Update search query in parent component
  };

  // Function to handle task item click
  const handleTaskClick = (task) => {
    setSelectedTask(task); // Set the selected task to show in the ModalTask
  };

  // Function to close the task modal
  const handleCloseTaskModal = () => {
    setSelectedTask(null); // Clear the selected task
  };

  // Function to highlight matching text within a string
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text; // Return the original text if no highlight is provided
    }
    const regex = new RegExp(`(${highlight})`, 'gi'); // Create a regex to match the highlight text
    const parts = text.split(regex); // Split text into parts based on the highlight regex
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-blue-300 font-bold">
          {part} {/* Highlight matching text with a background color */}
        </span>
      ) : (
        part
      )
    );
  };

  // Function to get the color class based on the task status
  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO':
        return 'bg-[#FE6244] text-white'; // Color for TODO status
      case 'DOING':
        return 'bg-[#EA047E] text-white'; // Color for DOING status
      case 'DONE':
        return 'bg-[#7C00FE] text-white'; // Color for DONE status
      default:
        return 'bg-gray-500 text-white'; // Default color for unknown status
    }
  };

  // Function to handle saving changes to the task
  const handleSave = (taskId) => {
    onEditTaskModal(taskId); // Call the 'onEditTaskModal' callback with the task ID
    handleCloseTaskModal(); // Close the task modal
  };

  // Function to handle task deletion
  const handleDeleteTask = (taskId) => {
    if (typeof onDelete === 'function') {
      onDelete(taskId); // Call the 'onDelete' callback with the task ID
    } else {
      console.error('onDelete is not a function'); // Log an error if 'onDelete' is not a function
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-[#E0FBE2] p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Search Tasks</h2>
          <button
            onClick={() => {
              onClose(); // Close the modal
              setLocalQuery(''); // Clear the local search query
              onSearchQueryChange(''); // Reset search query in parent component
            }}
            className="p-2 rounded-md"
          >
            <img className='w-4 h-6 cursor-pointer' src={close_icon} alt="Close" /> {/* Close button */}
          </button>
        </div>
        <input
          type="text"
          value={localQuery}
          onChange={handleSearchChange} // Handle input change for search query
          placeholder="Search tasks..."
          className="w-full mb-4 p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
        />
        <div className="overflow-y-auto max-h-80">
          {tasks.length === 0 ? (
            <p className="text-center">No tasks found</p> // Message if no tasks are found
          ) : (
            <ul>
              {tasks.filter(task =>
                task.title.toLowerCase().includes(localQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(localQuery.toLowerCase())
              ).map(task => (
                <li
                  key={task.id}
                  className="mb-3 cursor-pointer flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
                  onClick={() => handleTaskClick(task)} // Handle task item click
                >
                  <div className='font-semibold text-lg pl-2'>
                    <strong>{highlightText(task.title, localQuery)}</strong>: {highlightText(task.description, localQuery)}
                  </div>
                  <button
                    className={`w-1/6 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}
                    disabled
                  >
                    {task.status} {/* Display task status with color */}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {selectedTask && (
        <ModalTask
          show={!!selectedTask} // Show the ModalTask if a task is selected
          onClose={handleCloseTaskModal} // Close the ModalTask
          todo={selectedTask} // Pass the selected task to ModalTask
          onedit={handleSave} // Handle saving changes in ModalTask
          onDelete={handleDeleteTask} // Handle task deletion in ModalTask
        />
      )}
    </div>
  );
}

export default SearchModal;
