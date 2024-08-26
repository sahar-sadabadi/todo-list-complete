import React, { useState, useEffect } from 'react';
import TodoItems from './TodoItems';
import ModalTask from './ModalTask';
import { FaSortAmountDown, FaSortAmountUpAlt, FaSortAmountDownAlt } from 'react-icons/fa';

export const TodoCard = ({ title, tasks, onEdit, onDelete }) => {
  // State to manage the selected task and whether the modal is shown
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // State to manage the sorting order of tasks
  const [sortState, setSortState] = useState(0); // 0: unsorted, 1: ascending, 2: descending
  const [sortedTasks, setSortedTasks] = useState(tasks);

  useEffect(() => {
    // Sort tasks based on sortState and color-code them
    let sorted = [...tasks];
    if (sortState === 1) {
      // Ascending sort by deadline
      sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortState === 2) {
      // Descending sort by deadline
      sorted.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
    }

    const now = new Date();
    // Assign color-coded priority based on task index
    const colorCodedTasks = sorted.map((task, index) => {
      const daysRemaining = (new Date(task.deadline) - now) / (1000 * 60 * 60 * 24);
      let priorityClass = 'bg-[#A6FF96]'; // Default green

      if (index < 2) priorityClass = 'bg-[#FFA1F5]'; // Closest 2 tasks
      else if (index < 4) priorityClass = 'bg-[#D0BFFF]'; // Next 2 tasks

      return { ...task, priorityClass };
    });

    setSortedTasks(colorCodedTasks);
  }, [tasks, sortState]);

  // Function to handle clicking on a task
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  // Function to handle task edits
  const handleEditTask = (editedTask) => {
    const updatedTask = {
      ...editedTask,
      checked: editedTask.status === 'DONE',
    };
  
    // Update tasks and save to local storage
    const updatedTasks = sortedTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    onEdit(updatedTask);
    setShowModal(false);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle checkbox state changes and update task status
  const handleCheckboxChange = (task) => {
    let nextStatus = task.status;

    if (task.status === 'DONE' && task.checked) {
      nextStatus = 'DOING';
    } else {
      const statusOrder = ['TODO', 'DOING', 'DONE'];
      const currentStatusIndex = statusOrder.indexOf(task.status);
      const nextStatusIndex = (currentStatusIndex + 1) % statusOrder.length;
      nextStatus = statusOrder[nextStatusIndex];
    }

    const updatedTask = {
      ...task,
      status: nextStatus,
      checked: nextStatus === 'DONE', 
    };

    handleEditTask(updatedTask);
  };

  // Function to toggle the sorting state between unsorted, ascending, and descending
  const toggleSort = () => {
    setSortState((prev) => (prev + 1) % 3);
  };

  // Function to get the appropriate sorting icon based on the current sort state
  const getSortIcon = () => {
    switch (sortState) {
      case 1:
        return <FaSortAmountDown className="text-pink-500" />;
      case 2:
        return <FaSortAmountUpAlt className="text-pink-500" />;
      default:
        return <FaSortAmountDownAlt className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-[#FDFFAE] p-4 md:p-6 lg:p-8 rounded-xl m-2 md:m-4 lg:m-6 overflow-auto h-full max-w-screen-lg mx-auto">
      <div className="flex flex-col justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 lg:mb-0">
          <h2 className="text-xl border-b-2 border-gray-500 font-semibold">{title}</h2>
          {(title === 'TODO' || title === 'DOING') && (
            <button
              onClick={toggleSort}
              className="focus:outline-none p-2 rounded-full "
              aria-label={sortState === 1 ? 'Sort Descending' : sortState === 2 ? 'Unsort' : 'Sort Ascending'}
            >
              {getSortIcon()}
            </button>
          )}
        </div>
        {sortedTasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks available</p>
        ) : (
          <div className="w-full">
            {sortedTasks.map((task) => (
              <TodoItems
                key={task.id}
                text={task.title}
                onClick={() => handleTaskClick(task)}
                onCheck={() => handleCheckboxChange(task)}
                checked={task.checked}
                priorityClass={task.priorityClass}
              />
            ))}
          </div>
        )}
      </div>

      <ModalTask
        show={showModal}
        onClose={closeModal}
        todo={selectedTask}
        onedit={handleEditTask}
        onDelete={onDelete}
      />
    </div>
  );
};

export default TodoCard;
