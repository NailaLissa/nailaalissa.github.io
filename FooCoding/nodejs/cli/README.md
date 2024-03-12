# Todo ClI Application
The Todo Application is a simple command-line interface (CLI) tool for managing your todos. This application provides basic CRUD (Create, Read, Update, Delete) operations on todos, and utilizes Express.js to create a RESTful API for seamless interaction with todos stored in the file system.

# Requirements
Use Express.js to create a RESTful API for managing Todos.
Implement CRUD operations (Create, Read, Update, Delete) for Todos.
Store the Todos data in the file system using Node.js file system module (fs).
Organize your code in a structured manner, separating concerns where appropriate (e.g., routes, controllers, models).
Ensure error handling for various scenarios, such as invalid requests, missing data, etc. Extra points for implementing a validation middleware with libraries like TypeBox, Joi, or Zod.
Include appropriate comments to explain the functionality of each part of your code.
Implement basic validation to ensure that data passed to the API endpoints meets expected formats.
Add appropriate status codes and error messages in your API responses.
# Getting Started
* Prerequisites
Make sure you have the following installed on your machine:

Node.js
npm (Node Package Manager)
* Installation
Clone the repository to your local machine:
git clone https://github.com/your-username/todo-application.git
Navigate to the project directory:
* Run the Application:
npm start
* choose the option:
List Todos: GET /todos
Get Todo by Id: GET /todos/:id
Add Todo: POST /todos
Update Todo: PATCH /todos/:id
Delete Todo: DELETE /todos/:id
Testing:

* Features:
User-Friendly Commands: The CLI provides user-friendly commands to manage todos.
Continuous Operation: The application runs continuously until the user explicitly exits.
Command Overview:
list: Lists all Todos.
get: get todo by Id.
add <todo>: Adds a new Todo.
update <id> <todo>: Updates a Todo with new text.
delete <id>: Deletes a Todo.
end or Ctrl+C: Exits the application.
Error Handling: Proper error handling for scenarios like invalid input or failed API requests.
