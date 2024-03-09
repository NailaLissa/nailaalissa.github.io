import readline from 'readline';
import { getTodos, deleteTodo, addTodo, updateTodo } from './todosController.js';
// import chalk for give color
import chalk from 'chalk';
async function run() {
  await askForOption();
  await handleUserOption();
}

async function askForOption() {
  let selectedOption;
  do {
    const read = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    selectedOption = await new Promise((resolve) => {
      read.question(
        'Please input an option (list, add, update, delete, end to clsoe ): ',
        (option) => {
          read.close();
          resolve(option.toLowerCase());
        },
      );
    });

    await handleUserOption(selectedOption);
  } while (selectedOption !== 'end');
}

async function askForTodoDetails() {
  const questions = [
    { type: 'input', name: 'todo', message: 'Enter the todo title:' },
    { type: 'input', name: 'completed', message: 'Enter true or false:' },
    { type: 'input', name: 'userId', message: 'Enter UserId:' },
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answers = {};
  for (const question of questions) {
    const answer = await new Promise((resolve) => {
      rl.question(`${question.message}`, (input) => {
        resolve(input.trim());
      });
    });

    answers[question.name] = answer;
  }

  rl.close();
  return answers;
}

async function askForTodoUpdate() {
  const questions = [
    { type: 'input', name: 'todo', message: 'Enter new  todo Title:' },
    { type: 'input', name: 'completed', message: 'Enter true or false:' },
    { type: 'input', name: 'userId', message: 'Enter UserId:' },
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answers = {};
  for (const question of questions) {
    const answer = await new Promise((resolve) => {
      rl.question(`${question.message}`, (input) => {
        resolve(input.trim());
      });
    });

    answers[question.name] = answer;
  }

  rl.close();
  return answers;
}

async function askForId() {
  const questions = [{ type: 'input', name: 'id', message: 'Enter Id :' }];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter the ID:', (answer) => {
      rl.close();

      resolve(answer.trim());
    });
  });
}

async function handleUserOption(userOption) {
  switch (userOption) {
    case 'list':
      // Implement list functionality
      console.log('Listing Todos...');
      getTodos();
      return;
    case 'add':
      const todoDetails = await askForTodoDetails();
      await addTodo(todoDetails);
      // Implement add functionality with todoDetails
      console.log('Adding Todo:', todoDetails);

      break;
    case 'update':
      const idAnswer = await askForId();
      const id = Number(idAnswer);
      console.log('Enter New Data for Todo with id', id);
      const todoUpdate = await askForTodoUpdate();
      await updateTodo(id, todoUpdate);
      break;
    case 'delete':
      const idAnsw = await askForId();
      const idd = Number(idAnsw);
      console.log('Enter New Data for Todo with id', idd);
      await deleteTodo(idd);
      break;
    case 'end':
      /// Exite the application
      console.log(chalk.blue.bgRed.bold('Good Bye !!...'));
      break;
    default:
      console.log('Invalid option selected.');
  }
}

run();
