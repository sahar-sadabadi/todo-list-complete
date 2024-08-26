import React, { useState, useEffect } from 'react';
import todo_icon from '../assets/todo-icon.png';
import TodoCard from './TodoCard';
import SearchModal from './SearchModal';
import AddTaskModal from './AddTaskModal';
import search_icon from "../assets/searchIcon.svg";

export const Todo = () => {
  // State to manage the visibility of the search modal
  const [showSearchModal, setShowSearchModal] = useState(false);

  // State to manage the visibility of the add task modal
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);

  // State to manage the search query for filtering tasks
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect hook to load tasks from localStorage when the component mounts
  useEffect(() => {
    // Retrieve tasks from localStorage and set them in state
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Function to save the updated tasks list to localStorage
  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Function to handle adding a new task
  const handleAddTask = (newTask) => {
    // Create a new task with a unique ID and update the tasks list
    const updatedTasks = [...tasks, { id: Date.now(), ...newTask }];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    // Close the add task modal after adding the task
    setShowAddTaskModal(false);
  };

  // Function to handle editing an existing task
  const handleEditedTask = (updatedTask) => {
    // Update the task in the list if its ID matches the updated task's ID
    const editedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(editedTasks);
    saveTasksToLocalStorage(editedTasks); // Save the updated tasks to localStorage
  };

  // Function to handle deleting a task
  const handleDeleteTask = (taskId) => {
    // Filter out the task with the matching ID from the tasks list
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks); // Save the updated tasks to localStorage
  };

  // Function to filter tasks based on the search query
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Default task to display when no tasks are available
  const defaultTasks = [
    { id: 'default', title: 'Do Homework', description: 'Complete the math homework.', status: 'TODO' },
  ];

  return (
    <div className='flex flex-col p-4 md:p-6 lg:p-8 h-screen bg-[#C3EDC0] overflow-hidden'>
      <header className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <img className='w-8 h-8 md:w-10 md:h-10' src={todo_icon} alt='Todo Icon' />
          <h1 className='text-2xl md:text-3xl font-semibold ml-2'>To-do List</h1>
        </div>
        <button
          onClick={() => setShowSearchModal(true)} // Show search modal when button is clicked
          className='flex items-center px-4 py-2 bg-[#FBCEB5] rounded-full text-gray-800 font-medium hover:bg-[#f8bfa1] transition'
        >
          Search
          <img className='w-6 h-6 ml-2' src={search_icon} alt='Search Icon' />
        </button>
      </header>

      <div className='flex flex-col sm:flex-row items-center justify-center mb-4'>
        <input
          className='w-full sm:w-64 border rounded-full py-2 px-4 mb-2 sm:mb-0 sm:mr-2 placeholder-gray-600'
          type='text'
          placeholder='Enter your task...'
          onClick={() => setShowAddTaskModal(true)} // Show add task modal when input is clicked
        />
        <button
          onClick={() => setShowAddTaskModal(true)} // Show add task modal when button is clicked
          className='bg-[#FFAB76] text-gray-800 rounded-full py-2 px-6 font-medium hover:bg-[#fd9758] transition'
        >
          ADD
        </button>
      </div>

      <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto pb-8'>
        {/* Render TodoCard components for different task statuses */}
        <section>
          <TodoCard
            title='TODO'
            tasks={filteredTasks.length > 0 ? filteredTasks.filter(task => task.status === 'TODO') : defaultTasks}
            onEdit={handleEditedTask}
            onDelete={handleDeleteTask}
          />
        </section>
        <section>
          <TodoCard
            title='DOING'
            tasks={filteredTasks.filter(task => task.status === 'DOING')}
            onEdit={handleEditedTask}
            onDelete={handleDeleteTask}
          />
        </section>
        <section>
          <TodoCard
            title='DONE'
            tasks={filteredTasks.filter(task => task.status === 'DONE')}
            onEdit={handleEditedTask}
            onDelete={handleDeleteTask}
          />
        </section>
      </div>

      {/* Render modals for searching and adding tasks */}
      <SearchModal
        show={showSearchModal}
        onClose={() => setShowSearchModal(false)} // Close search modal when triggered
        tasks={filteredTasks}
        onSearchQueryChange={setSearchQuery}
        onEditTaskModal={handleEditedTask}
        onDelete={handleDeleteTask}
      />

      <AddTaskModal
        show={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)} // Close add task modal when triggered
        onAdd={handleAddTask}
      />
    </div>
  );
};

export default Todo;
