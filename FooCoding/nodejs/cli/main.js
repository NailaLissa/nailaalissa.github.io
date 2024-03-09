#!/usr/bin/env node

// import all the API todos functions
import { getTodos, deleteTodo, addTodo, updateTodo, getUserById } from './todosController.js';
// import all the functions for asking more details
import { askForTodoDetails, askForTodoUpdate, askForId, askForOption } from './details.js';
// import chalk for give color
import chalk from 'chalk';

/// interactive window in command line Interface
async function interactiveMenu() {
  let selectedOption;

  do {
    selectedOption = await askForOption();

    switch (selectedOption) {
      case 'list':
        // Implement list functionality
        console.log(chalk.yellow('Listing All Todos...'));
        getTodos();

        break;
      case 'add':
        // Implement add new todo functionality
        console.log(chalk.magenta('Enter Data for new Todo '));
        const todoDetails = await askForTodoDetails();
        await addTodo(todoDetails);

        break;
      case 'update':
        // Implement update todo functionality
        const idAnswer = await askForId();
        const id = Number(idAnswer.id);
        console.log(chalk.magenta('Enter New Data for Todo with id'), id);
        const todoUpdate = await askForTodoUpdate();
        await updateTodo(id, todoUpdate);
        break;
      case 'delete':
        // Implement delete todo functionality
        const askDelete = await askForId();
        const iddelete = Number(askDelete.id);
        console.log('Deleting Todo...');
        await deleteTodo(iddelete);
        break;
      case 'get':
        // Implement get all todos for user functionality
        console.log(chalk.magenta('Enter User Id you want to show Todos'));
        const askid = await askForId();
        const randomId = Number(askid.id);
        console.log(chalk.green(`Get Users Todo with Id ${randomId} `));
        await getUserById(randomId);
        break;
      case 'exit':
        /// Exite the application
        console.log(chalk.blue.bgRed.bold('Good Bye !!...'));
        break;
      default:
        console.log('Invalid option selected.');
    }
  } while (selectedOption !== 'exit');
}

interactiveMenu();
