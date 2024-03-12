// import all the API todos functions
import { getTodos, deleteTodo, addTodo, updateTodo, gettaskById } from './todosController.js';
// import all the functions for asking more details
import { askForTodoDetails, askForId, askForOption } from './details.js';
// import chalk for give color
import chalk from 'chalk';
function displayMenu() {
  console.log(chalk.red('Welcome to My Todo Application:'));
  console.log(chalk.yellow('--------------------------------'));
  console.log('Choose :');
  console.log(`${chalk.blue('list ')}to show all todos.`);
  console.log(`${chalk.blue('get')} to get a todo.}`);
  console.log(`${chalk.blue('add')} to add a new todo.`);
  console.log(`${chalk.blue('update')} to modify an existing todo.`);
  console.log(`${chalk.blue('delete')} to remove a todo.`);
  console.log(`${chalk.blue('exit')} to close the app.`);
  console.log(chalk.yellow('--------------------------------'));
}

/// interactive window in command line Interface
async function interactiveMenu() {
  let selectedOption;
  displayMenu();
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
        console.log(chalk.magenta('Enter New Data for Todo with id'), idAnswer.id);
        const todoUpdate = await askForTodoDetails();
        await updateTodo(idAnswer.id, todoUpdate);
        break;
      case 'delete':
        // Implement delete todo functionality
        const askDelete = await askForId();
        await deleteTodo(askDelete.id);
        console.log('Deleting Todo...');
        break;
      case 'get':
        // Implement get all todos for user functionality
        console.log(chalk.magenta('Enter User Id you want to show Todos'));
        const askid = await askForId();
        console.log(chalk.green(`Get Users Todo with Id ${askid.id} `));
        const task = await gettaskById(askid.id);
        console.log(task);
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
