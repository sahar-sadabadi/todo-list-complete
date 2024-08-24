# todo-list-complete
Todo List Project Documentation
Introduction
The Todo component is a simple and user-friendly task management tool that allows users to create, search, edit, and delete tasks. This component includes several essential features that are described below.

Technologies Used
This project is built using React.js and styled with Tailwind CSS. Data is stored in the user's local storage to manage and access tasks. The project also utilizes the React Icons library for some icons.

Features
Add New Task:

Users can add new tasks to their task list by clicking the "ADD" button or on the text input field.
After clicking, a modal window opens where users can enter the details of the new task.
Search Tasks:

Users can search for tasks by clicking the "Search" button in the header.
Clicking the search button opens a modal where users can enter keywords to filter tasks.
Edit Tasks:

Users can edit existing tasks.
To edit, users click the edit option next to each task to change the task's information.
Delete Tasks:

Users can delete tasks from their list.
Clicking the "Delete" button next to each task permanently removes the task from the list.
LocalStorage:

All tasks are stored in the browser's local storage, so tasks persist after closing the browser or reloading the page.
Categorization by Status:

Tasks are categorized into three statuses: "TODO" (To Do), "DOING" (In Progress), and "DONE" (Completed).
Each status is displayed in a separate column, allowing users to easily manage their task statuses.
Color Coding by Due Date:

Tasks are color-coded based on their due date.
Tasks with nearer due dates can be filtered by the status filters available to the user.
User Workflow
Adding a New Task:

The user first clicks on the text field that says "Enter your task...".
A modal opens where the user can enter the title, description, and status of the task.
After entering the details, the user clicks the confirm button to add the task to the list.
Searching Tasks:

The user clicks the "Search" button in the header.
A modal opens where the user can enter keywords related to the tasks they are looking for.
Tasks are automatically filtered based on the user's search.
Editing a Task:

To edit, the user clicks the "Edit" button next to each task.
An edit form opens where the user can make the necessary changes.
After making changes, the task is saved with the new information.
Deleting a Task:

The user can delete a task by clicking the "Delete" button next to it.
The task is removed from the list and also deleted from the browser's local storage.
Components in the Project:
Task Search Modal
Add New Task Modal
Task Display, Delete, and Edit Modal
Todo Component for displaying the overall project
TodoCard Component for displaying each status (todo, doing, done)
TodoItem Component for displaying each task
Conclusion
The Todo component is a comprehensive and simple tool for managing daily tasks. With various features, it allows users to efficiently manage their tasks. Since tasks are stored in localStorage, users can be assured that their information will be preserved for future use.
