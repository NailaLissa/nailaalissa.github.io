import inquirer from 'inquirer';
// Function to ask for details when adding a new todo
export async function askForTodoDetails() {
  const questions = [
    { type: 'input', name: 'todo', message: 'Enter the todo:' },
    { type: 'input', name: 'completed', message: 'Enter the true or false:' },
    { type: 'input', name: 'userId', message: 'Enter UserId' },
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
}
// Function to ask for details when updating a todo
export async function askForTodoUpdate() {
  const questions = [
    { type: 'input', name: 'todo', message: 'Enter update todo:' },
    { type: 'input', name: 'completed', message: 'Enter true or false for completed:' },
    { type: 'input', name: 'userId', message: 'Enter update UserId:' },
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
}
// Function to ask for an ID
export async function askForId() {
  const questions = [{ type: 'input', name: 'id', message: 'Enter Id :' }];

  const answers = await inquirer.prompt(questions);
  return answers;
}

// Function to ask for the user's choice from a list of options
export async function askForOption() {
  const options = [
    { name: 'List Todos', value: 'list' },
    { name: 'Add Todo', value: 'add' },
    { name: 'Update Todo', value: 'update' },
    { name: 'Delete Todo', value: 'delete' },
    { name: 'Get todos for user', value: 'get' },
    { name: 'Exit', value: 'exit' },
  ];

  const answer = await inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'Select an option:',
    choices: options,
  });

  return answer.option;
}
