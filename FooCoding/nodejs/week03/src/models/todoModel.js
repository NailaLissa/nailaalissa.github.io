const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../data/todo.json');
/// functio to read file from todo.json
exports.read = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(`Reading JSON file '${filePath}': successfully`);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file '${filePath}':`, error.message);
    throw error;
  }
};
// function to write into file
exports.write = async (users) => {
  try {
    const data = JSON.stringify(users, null, 2);
    await fs.writeFile(filePath, data, 'utf-8');
    console.log(`Writing JSON file '${filePath}': successfully`);
  } catch (error) {
    console.error(`Error writing JSON file '${filePath}':`, error.message);
    throw error;
  }
};
