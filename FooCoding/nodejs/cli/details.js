import inquirer from 'inquirer';
// Function to ask for details when adding a new todo
export async function askForTodoDetails() {
  const questions = [
    { type: 'input', name: 'todo', message: 'Enter the todo title:' },
    { type: 'input', name: 'descdescription', message: 'Enter description' },
    { type: 'input', name: 'completed', message: 'Enter the true or false:' },
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
    { name: 'Get todo by Id', value: 'get' },
    { name: 'Add Todo', value: 'add' },
    { name: 'Update Todo', value: 'update' },
    { name: 'Delete Todo', value: 'delete' },
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
