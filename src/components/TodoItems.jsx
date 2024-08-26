import React from 'react';

const TodoItems = ({ text, onClick, onCheck, checked, priorityClass }) => {
  return (
    <div className={`flex items-center p-2 my-2 gap-2 rounded-lg ${priorityClass}`}>
      {/* Checkbox input for task completion status */}
      <input
        type="checkbox"
        onChange={onCheck} // Calls the onCheck function passed as a prop when the checkbox state changes
        checked={checked} // Sets the checkbox state based on the checked prop
        className='form-checkbox h-6 w-6 ml-2' // Tailwind CSS classes for styling the checkbox
      />
      {/* Container for the task text, clickable to trigger the onClick function */}
      <div
        onClick={onClick} // Calls the onClick function passed as a prop when the task text is clicked
        className='flex-1 flex items-center cursor-pointer p-2 rounded-lg'
      >
        <p className='text-slate-900 text-lg ml-2'>{text}</p> {/* Displays the task text */}
      </div>
    </div>
  );
};

export default TodoItems;
