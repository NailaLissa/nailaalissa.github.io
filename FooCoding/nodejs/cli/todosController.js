const apiUrl = 'https://dummyjson.com/todos';
//const chalk = require('chalk');
import chalk from 'chalk';
export const getTodos = async () => {
  fetch('https://dummyjson.com/todos')
    .then((response) => response.json())
    .then((data) => {
      console.log('All todos:', data);
    })
    .catch((error) => console.error('Error fetching todos:', error));
};

// Function to get a todo by ID
export const getTodoById = async (todoId) => {
  fetch(`${apiUrl}/${todoId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Todo by ID:', data);
    })
    .catch((error) => console.error('Error fetching todo by ID:', error));
};
/// add todo
export const addTodo = async (todoDetails) => {
  const idadd = Number(todoDetails.userId);
  const todoPayload = {
    todo: todoDetails.todo,
    completed: todoDetails.completed,
    userId: idadd,
  };

  fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoPayload),
  })
    .then((res) => res.json())
    .then(console.log(chalk.green('New Todo is created')))
    .catch((error) => console.error('Error adding todo:', error.message));
};

// Function to update a todo
export const updateTodo = async (id, todoUpdate) => {
  const todoPayload = {
    todo: todoUpdate.todo,
    completed: todoUpdate.completed,
    userId: todoUpdate.userId,
  };

  fetch(`https://dummyjson.com/todos/${id}`, {
    method: 'PATCH' /* or PATCH */,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todoPayload,
    }),
  })
    .then((res) => res.json())
    .then(console.log(chalk.blue.underline.bold(`\n Todo with Id ${id} is updated `), todoPayload));
};
// Function to delete a todo by ID
export const deleteTodo = (todoId) => {
  fetch(`${apiUrl}/${todoId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(chalk.red.bold('\n', `Todo  is deleted `), data);
    })
    .catch((error) => console.error('Error deleting todo:', error));
};

// Function to get a user by ID
export const getUserById = (userId) => {
  fetch(`https://dummyjson.com/todos/user/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(chalk.yellow('\n User by ID:'), data);
    })
    .catch((error) => console.error('Error fetching user by ID:', error));
};
