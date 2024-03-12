const apiUrl = 'https://dummyjson.com/todos';
//const chalk = require('chalk');
import chalk from 'chalk';
// Function to fetch all todos
export const getTodos = async () => {
  try {
    const response = await fetch('http://localhost:3000/todos');
    if (!response.ok) {
      throw new Error(`Error fetching todos. Status: ${response.status}`);
    }

    const todos = await response.json();
    console.log(todos);
  } catch (error) {
    console.error(`Error fetching todos. ${error.message}`);
  }
};

/// add todo
export const addTodo = async (todoDetails) => {
  const todoPayload = {
    title: todoDetails.todo,
    description: todoDetails.description,
    completed: todoDetails.completed,
  };

  try {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoPayload),
    });

    if (!response.ok) {
      // If the response status is not in the range 200-299, it's an error
      const errorText = await response.text();
      throw new Error(`Error adding todo. Status: ${response.status}, ${errorText}`);
    }

    const data = await response.json();
    console.log(chalk.green('New Todo is created:', data));
  } catch (error) {
    console.error(error.message);
  }
};

// Function to update a todo
export const updateTodo = async (id, todoUpdate) => {
  const todoPayload = {
    title: todoUpdate.todo,
    description: todoUpdate.description,
    completed: todoUpdate.completed,
  };

  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoPayload),
    });

    if (response.status === 404) {
      throw new Error(`Todo with ID ${id} not found`);
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error updating todo. Status: ${response.status}, ${errorText}`);
    }

    console.log(chalk.blue.underline.bold(`Todo with Id ${id} is updated`), todoPayload);
  } catch (error) {
    console.error('Error updating todo:', error.message);
  }
};

// Function to delete a todo by ID
export const deleteTodo = async (todoId) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error deleting todo. Status: ${response.status}`);
    }

    console.log(chalk.red.bold('\n', `Todo with Id ${todoId} is deleted`));
  } catch (error) {
    console.error('Error deleting todo:', error.message);
  }
};

// Function to fetch a todo by ID
export const gettaskById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching todo. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching todo. ${error.message}`);
    return { error: error.message };
  }
};
