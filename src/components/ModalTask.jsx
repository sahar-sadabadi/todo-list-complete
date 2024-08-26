import React, { useState, useEffect } from 'react';
import delete_icon from '../assets/deleteIcon.svg';
import close_icon from "../assets/icons8-close.svg";
import edit_icon from "../assets/editIcon.svg";

// ModalTask component for viewing, editing, or deleting a task
function ModalTask({ show, onClose, todo, onedit, onDelete }) {
  // State to track if the component is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  // State to track if the component is in deleting confirmation mode
  const [isDeleting, setIsDeleting] = useState(false);
  // State to hold the edited task details
  const [editedTask, setEditedTask] = useState({ title: '', description: '', status: '' });

  // Effect to update the edited task state when 'todo' prop changes
  useEffect(() => {
    if (todo) {
      setEditedTask(todo);
    }
  }, [todo]);

  // Return null if 'show' is false to hide the modal
  if (!show) {
    return null;
  }

  // Function to handle saving changes and exit editing mode
  const handleSave = () => {
    onedit(editedTask); // Call the 'onedit' callback with the updated task details
    setIsEditing(false); // Exit editing mode
  };

  // Function to handle cancelling edit or delete actions
  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode
    setIsDeleting(false); // Exit deleting confirmation mode
  };

  // Function to handle input field changes
  const handleChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value, // Update the specific field in the editedTask state
    });
  };

  // Function to handle status change with a delay
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;

    // Set timeout to apply the status change with a 300ms delay
    setTimeout(() => {
      setEditedTask((prevState) => ({
        ...prevState,
        status: newStatus,
        checked: newStatus === 'DONE' ? true : prevState.checked, // Ensure 'checked' is true if status is 'DONE'
      }));
    }, 300);
  };

  // Function to handle task deletion
  const handleDelete = () => {
    if (typeof onDelete === 'function') {
      setIsEditing(false); // Exit editing mode
      onDelete(todo.id); // Call the 'onDelete' callback with the task ID
      onClose(); // Close the modal
      setIsDeleting(false); // Exit deleting confirmation mode
    } else {
      console.error('onDelete is not a function'); // Log an error if 'onDelete' is not a function
    }
  };

  // Function to get the color class based on the task status
  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO':
        return 'border-yellow-500 text-yellow-500'; // Color for TODO status
      case 'DOING':
        return 'border-orange-500 text-orange-500'; // Color for DOING status
      case 'DONE':
        return 'border-green-500 text-green-500'; // Color for DONE status
      default:
        return 'border-gray-500 text-white'; // Default color
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#E0FBE2] p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl md:text-2xl font-bold mb-4 flex justify-between items-center">
          <span className={`${isDeleting ? 'text-[#FF0000] text-lg' : ''}`}>
            {isEditing ? (
              'Edit Task' // Title when in editing mode
            ) : isDeleting ? (
              'Are you sure you want to delete this task?' // Title when in deleting mode
            ) : (
              'View Task' // Title when viewing the task
            )}
          </span>
          <button
            onClick={() => { onClose(); handleCancel(); }} // Close the modal and cancel any ongoing actions
            className="px-2 py-1 rounded-md flex place-content-end"
          >
            <img className='w-4 cursor-pointer' src={close_icon} alt="Close" /> {/* Close button */}
          </button>
        </h2>
        {isEditing ? (
          <>
            <label className='font-semibold'>Title</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange} // Update title on change
              placeholder="Title"
              className="border p-2 w-full mb-2 rounded-lg"
            />
            <label className='font-semibold'>Description</label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange} // Update description on change
              placeholder="Description"
              className="border p-2 w-full rounded-lg"
            />
            
            <label className='font-semibold'>Deadline</label>
            <input
              type="date"
              name="deadline"
              value={editedTask.deadline}
              onChange={handleChange} // Update deadline on change
              placeholder="Deadline"
              className="border p-2 w-full mb-2 rounded-lg"
            />

            <label className='font-semibold'>Status</label>
            <div className="flex gap-4 pt-1">
              <div className={`pr-2 ${getStatusColor("TODO")}`}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="TODO"
                    checked={editedTask.status === 'TODO'}
                    onChange={handleStatusChange} // Update status on change
                    className="mr-2"
                  />
                  TODO
                </label>
              </div>
              <div className={`pr-2 ${getStatusColor("DOING")}`}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="DOING"
                    checked={editedTask.status === 'DOING'}
                    onChange={handleStatusChange} // Update status on change
                    className="mr-2"
                  />
                  DOING
                </label>
              </div>
              <div className={`pr-2 ${getStatusColor("DONE")}`}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="DONE"
                    checked={editedTask.status === 'DONE'}
                    onChange={handleStatusChange} // Update status on change
                    className="mr-2"
                  />
                  DONE
                </label>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='shadow p-3 rounded-xl shadow-purple-200 bg-white'>
              <div className="mb-4">
                <label className="font-semibold">Title:</label>
                <p className="mt-1 pb-2 w-full rounded-lg">{todo.title}</p> {/* Display task title */}
              </div>
              
              <div className="mb-4">
                <label className="font-semibold">Description:</label>
                <p className="mt-1 pb-2 w-full rounded-lg">{todo.description}</p> {/* Display task description */}
              </div>
              
              <div className="mb-4">
                <label className="font-semibold">Deadline:</label>
                <p className="mt-1 pb-2 w-full rounded-lg">{todo.deadline}</p> {/* Display task deadline */}
              </div>
              
              <div className="mb-4 pb-2 flex items-center">
                <label className="font-semibold">Status:</label>
                <p className={`ml-2 mt-2 p-2 w-full rounded-lg ${getStatusColor(todo.status)}`}>{todo.status}</p> {/* Display task status */}
              </div>
            </div>
          </>
        )}
        {isEditing && (
          <div className="flex justify-end gap-3 mt-4 items-center">
            <button
              onClick={handleSave} // Save changes and exit editing mode
              className="bg-[#32FF6A] px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleCancel} // Cancel editing and exit editing mode
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
        {!isDeleting && !isEditing && (
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setIsDeleting(true)} className='p-2 rounded-xl flex justify-between gap-1 items-center bg-[#FF1F5A] text-white'>
              Delete
              <img className='w-4 cursor-pointer' src={delete_icon} alt="Delete" /> {/* Delete button */}
            </button>
            <button
              onClick={() => setIsEditing(true)} // Switch to editing mode
              className='flex justify-between gap-1 items-center p-2 bg-blue-500 rounded-xl text-white'
            >
              Edit
              <img className='w-4 cursor-pointer' src={edit_icon} alt="Edit" /> {/* Edit button */}
            </button>
          </div>
        )}
        {isDeleting && (
          <div className="flex justify-end gap-3 mt-4 items-center">
            <button
              onClick={handleDelete} // Confirm deletion
              className='bg-[#32FF6A] px-4 py-2 rounded-md'
            >
              OK
            </button>
            <button
              onClick={handleCancel} // Cancel deletion and exit deleting mode
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalTask;
