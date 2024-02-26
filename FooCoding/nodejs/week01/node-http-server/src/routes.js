import { defineRoute, router } from './utils/define-route.js';
import fs from 'fs/promises';
const usersPath = './src/data/users.json';
const postsPath = './src/data/posts.json';
let users = [];
let posts = [];

let deletedIds = [];
const getIds = (items) => {
  return items.map((item) => item.id);
};
///// Generate Unique Id///////
const generateUniqueId = (newid, itemdsIds) => {
  let itemsId = itemdsIds;
  let newId = itemsId.find((id) => id === newid);
  let idDeleted = deletedIds.find((id) => newid === id);

  if (!newId && !idDeleted) {
    return parseInt(newid);
  } else if (idDeleted && !newId) {
    if (idDeleted >= newid) {
      let x = parseInt(idDeleted) + 1;
      return x;
    } else {
      return newid;
    }
  }
  return newid;
};

const markIdAsDeleted = (id) => {
  deletedIds.push(id);
};

//////////////////////////
const readDataFromFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(` reading JSON file '${filePath}': successfully`);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file '${filePath}':`, error.message);
    throw error;
  }
};

export const initializeData = async () => {
  try {
    users = await readDataFromFile(usersPath);
    posts = await readDataFromFile(postsPath);
  } catch (error) {
    console.error('Data initialization failed:', error.message);
  }
};

initializeData();

//////////////////////

const saveUsersToFile = () => {
  fs.writeFile('./src/data/users.json', JSON.stringify(users), (error) => {
    // if (error) {
    //   console.error(error);
    // } else {
    //   console.log(' data saved successfully');
    // }

    if (error) {
      console.error('Error saving users data:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
    } else {
      console.log('Data saved successfully');

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 201;
      res.end(JSON.stringify({ message: `New Item with ${newUser.id} Created successfully` }));
    }
  });
};

const savePostsToFile = () => {
  fs.writeFile('./src/data/posts.json', JSON.stringify(posts), (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Posts data saved successfully');
    }
  });
};

//////// Get All Users/Posts////////////
const getAllItems = (req, res, items) => {
  if (items.length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({ items }));
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Data not found` }));
  }
};

//////// Get By Id////////////
const getItemById = (req, res, items) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (!item) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Data with ID ${itemId} not found` }));
    return;
  }
  if (items === users) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const { password, ...rest } = item;
    res.end(JSON.stringify(rest));
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(item));
  }
};

//////////// Create new User//////
const createUser = (req, res) => {
  const newUser = req.body;
  if (!newUser || !newUser.name || !newUser.email || !newUser.password) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid data. Body cannot be empty.' }));
    return;
  }
  const emailExists = users.find((user) => user.email === newUser.email);
  if (emailExists) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User with email ${newUser.email} is already Exist` }));
    return;
  }
  let usersIds = getIds(users);
  let lastUsedId = Math.max(...usersIds);
  // Generate a new unique ID
  let newUserId = generateUniqueId(lastUsedId + 1, usersIds);
  newUser.id = newUserId;
  users.push({ id: newUserId, ...newUser });
  saveUsersToFile();
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;
  res.end(JSON.stringify({ message: `New User with ${newUser.id} Created successfully` }));
};
////////// Update User/Post By Id///////
const patchUser = (req, res) => {
  const userId = parseInt(req.params.id);
  let user = users.find((user) => user.id === userId);

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User with ID ${userId} not found` }));
    return;
  }
  const emailExists = users.find((user) => user.email === req.body.email);
  if (emailExists) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User with email ${req.body.email} is already Exist` }));
    return;
  }

  const userIndex = users.findIndex((user) => user.id === userId);
  const updateFields = req.body;
  users[userIndex] = { ...users[userIndex], ...updateFields };
  saveUsersToFile();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: `User with ID ${userId} updated successfully` }));
};

////////// Delete User/Post By Id///////
const deleteItem = (req, res, items, saveDataFunction) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    markIdAsDeleted(itemId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    saveDataFunction();
    res.end(
      JSON.stringify({
        message: `Data with ID ${itemId} Deleted successfully`,
      }),
    );
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User with ID ${itemId} not found` }));
  }
};

////////// Create New User/Post///////
const createPost = (req, res) => {
  const newPost = req.body;
  if (!newPost || Object.keys(newPost).length === 0) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid data. Body cannot be empty.' }));
    return;
  }
  let PostsIds = getIds(posts);
  let lastUsedId = Math.max(...PostsIds);
  // Generate a new unique ID
  let postId = generateUniqueId(lastUsedId + 1, PostsIds);

  newPost.id = postId;
  posts.push({ id: postId, ...newPost });
  savePostsToFile();
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;
  res.end(JSON.stringify({ message: `New Post with ID ${postId} Created successfully` }));
};
//////////Patch Post //////
const patchPost = (req, res) => {
  const postId = parseInt(req.params.id);
  let post = posts.find((post) => post.id === postId);

  if (!post) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Post with ID ${postId} not found` }));
    return;
  }

  const postIndex = posts.findIndex((post) => post.id === postId);
  const updateFields = req.body;
  posts[postIndex] = { ...posts[postIndex], ...updateFields };
  savePostsToFile();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: `Post with ID ${postId} updated successfully` }));
};
//////////// Users ////////////////
defineRoute('GET', '/users', (req, res) => getAllItems(req, res, users));
defineRoute('GET', '/users/:id', (req, res) => getItemById(req, res, users));
defineRoute('POST', '/users', (req, res) => createUser(req, res));
defineRoute('PATCH', '/users/:id', (req, res) => patchUser(req, res));
defineRoute('DELETE', '/users/:id', (req, res) => deleteItem(req, res, users, saveUsersToFile));

//////////// Posts////////////////
defineRoute('GET', '/posts', (req, res) => getAllItems(req, res, posts));
defineRoute('GET', '/posts/:id', (req, res) => getItemById(req, res, posts));
defineRoute('POST', '/posts', (req, res) => createPost(req, res));
defineRoute('PATCH', '/posts/:id', (req, res) => patchPost(req, res));
defineRoute('DELETE', '/posts/:id', (req, res) => deleteItem(req, res, posts, savePostsToFile));

export default router;
