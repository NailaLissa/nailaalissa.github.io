import readline from 'node:readline';
import chalk from 'chalk';
import { getTodos, deleteTodo, addTodo, updateTodo, getUserById } from './todosController.js';
// import all the functions for asking more details
import { askForTodoDetails, askForTodoUpdate, askForId, askForOption } from './details.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Whate Do you want to Todo> ',
});

rl.prompt(console.log('Choose : list, add , update , delete'));

rl.on('line', async (line) => {
  switch (line.trim()) {
    case 'list':
      console.log('List all todos');
      getTodos();
      break;
    case 'add':
      console.log('add!');
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
    case 'end':
      console.log(chalk.blue.bgRed.bold('Good Bye !!...'));
      rl.close();
      break;
    default:
      //console.log('Choose : list, add , update , delete')
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day! bye!');
  process.exit(0);
});
