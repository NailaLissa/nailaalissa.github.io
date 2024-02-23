import { defineRoute, router } from './utils/define-route.js';
import fs from 'fs/promises';
const usersPath = './src/data/users.json';
const postsPath = './src/data/posts.json';
let users = [];
let posts = [];

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

//initializeData();

const saveUsersToFile = () => {
  fs.writeFile('./src/data/users.json', JSON.stringify(users), (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(' data saved successfully');
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
  try {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({ items }));
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Data not found` }));
  }
};

//////// Get By Id////////////
const getItemById = (req, res, items) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (item) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(item));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Data with ID ${itemId} not found` }));
  }
};

////////// Create New User/Post///////
const createItem = (req, res, items, saveDataFunction) => {
  const newItem = req.body;
  if (!newItem || Object.keys(newItem).length === 0) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid data. Body cannot be empty.' }));
    return;
  }
  newItem.id = items.length + 1;

  items.push({ id: newItem.id, ...newItem });
  saveDataFunction();
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;
  res.end(JSON.stringify({ message: 'New Item Created successfully' }));
};
////////// Update User/Post By Id///////
const patchItem = (req, res, items, saveDataFunction) => {
  const itemId = parseInt(req.params.id);
  let item = items.find((item) => item.id === itemId);

  if (!item) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Data with ID ${itemId} not found` }));
    return;
  }
  const itemIndex = items.findIndex((item) => item.id === itemId);
  const updateFields = req.body;
  items[itemIndex] = { ...items[itemIndex], ...updateFields };
  saveDataFunction();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: `Data with ID ${itemId} updated successfully` }));
};
////////// Delete User/Post By Id///////
const deleteItem = (req, res, items, saveDataFunction) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    saveDataFunction();
    res.end(
      JSON.stringify({
        message: `User with ID ${itemId} Deleted successfully`,
      }),
    );
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User with ID ${itemId} not found` }));
  }
};

////////// Update User/Post By Id///////
const putItem = (req, res, items, saveDataFunction) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (item) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const updateFields = req.body;
    Object.assign(item, updateFields);
    saveDataFunction();
    res.end(
      JSON.stringify({
        message: `Data with ID ${itemId} updated successfully`,
      }),
    );
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User with ID ${itemId} not found` }));
  }
};

//////// Get Post By User Id////////////
const getPostByUserId = (req, res, items) => {
  const userId = parseInt(req.params.id);
  const getUser = users.find((user) => userId === user.id);

  if (getUser) {
    const userPosts = items.filter((post) => post.userId === getUser.id);

    if (userPosts.length > 0) {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(userPosts));
      return;
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: "This user don't have any posts" }));
      return;
    }
  }

  res.writeHead(400, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ message: 'User not found' }));
};

////////// Create New Post by UserId///////
const createPostByUserId = (req, res, items, saveDataFunction) => {
  const newItem = req.body;
  let status = 400;
  let message = 'Item not found';

  if (!newItem || Object.keys(newItem).length === 0) {
    res.writeHead(400, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid data. Body cannot be empty.' }));
    return;
  }

  newItem.id = items.length + 1;
  newItem.userId = parseInt(req.params.id);
  items.push({ id: newItem.id, userId: newItem.userId, ...newItem });
  saveDataFunction();
  status = 201;
  message = 'New Post Created successfully';

  res.writeHead(status, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ message }));
};

////////// Delete Post By UserId///////
const deletePostByUserID = (req, res, items, saveDataFunction) => {
  const itemId = parseInt(req.params.id);
  const postId = parseInt(req.body.id);
  const updateFields = req.body;
  const getUser = users.find((user) => itemId === user.id);

  if (getUser) {
    const getUserPosts = items.filter((post) => post.userId === getUser.id);

    if (getUserPosts.length > 0) {
      if (postId) {
        // Delete a specific post
        const postIndex = items.findIndex((item) => item.id === postId);

        if (postIndex !== -1) {
          items.splice(postIndex, 1);
          saveDataFunction();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              message: `Post ${postId} for User ID ${itemId} deleted successfully`,
            }),
          );
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: `Post ${postId} not found for User ID ${itemId}` }));
        }
      } else {
        // Delete all posts for a specific user
        const postsToDelete = items.filter((post) => post.userId === itemId);

        if (postsToDelete.length > 0) {
          postsToDelete.forEach((post) => {
            const postIndex = items.findIndex((item) => item.id === post.id);
            items.splice(postIndex, 1);
          });

          saveDataFunction();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              message: `Posts for User ID ${itemId} deleted successfully`,
            }),
          );
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: `No posts found for User ID ${itemId}` }));
        }
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Posts for User ID ${itemId} not found` }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User with ID ${itemId} not found` }));
  }
};

/////////////////////////Update Specific post by UserID Or All Posts /////

const patchPostByUserId = (req, res, items, saveDataFunction) => {
  const itemId = parseInt(req.params.id);
  const getUser = users.find((user) => itemId === user.id);

  if (getUser) {
    const getUserPosts = posts.filter((post) => post.userId === getUser.id);
    const postId = parseInt(req.body.id);
    const updateFields = req.body;

    if (getUserPosts.length > 0) {
      if (postId) {
        ///////////update spicific post//////
        const getPost = getUserPosts.find((post) => post.id === postId);
        Object.assign(getPost, updateFields);
        saveDataFunction();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: `Post ${postId}  for User ID${itemId} updated successfully`,
          }),
        );
      } else {
        ///////////update all posts ////////
        getUserPosts.forEach((post) => Object.assign(post, updateFields));
        saveDataFunction();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: `Posts for User ID ${itemId} updated successfully`,
          }),
        );
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Posts for User ID ${itemId} not found` }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User with ID ${itemId} not found` }));
  }
};

//////////// Users ////////////////
defineRoute('GET', '/users', (req, res) => getAllItems(req, res, users));
defineRoute('GET', '/users/:id', (req, res) => getItemById(req, res, users));
defineRoute('POST', '/users', (req, res) => createItem(req, res, users, saveUsersToFile));
defineRoute('PATCH', '/users/:id', (req, res) => patchItem(req, res, users, saveUsersToFile));
defineRoute('PUT', '/users/:id', (req, res) => putItem(req, res, users, saveUsersToFile));
defineRoute('DELETE', '/users/:id', (req, res) => deleteItem(req, res, users, saveUsersToFile));

//////////// Posts////////////////
defineRoute('GET', '/posts', (req, res) => getAllItems(req, res, posts));
defineRoute('GET', '/posts/:id', (req, res) => getItemById(req, res, posts));
defineRoute('POST', '/posts', (req, res) => createItem(req, res, posts, savePostsToFile));
defineRoute('PATCH', '/posts/:id', (req, res) => patchItem(req, res, posts, savePostsToFile));
defineRoute('PUT', '/posts/:id', (req, res) => putItem(req, res, posts, savePostsToFile));
defineRoute('DELETE', '/posts/:id', (req, res) => deleteItem(req, res, posts, savePostsToFile));

/////////////////Posts By UserId/////////
defineRoute('POST', '/posts/posts-by-user/:id', (req, res) =>
  createPostByUserId(req, res, posts, savePostsToFile),
);
defineRoute('GET', '/posts/posts-by-user/:id', (req, res) => getPostByUserId(req, res, posts));

defineRoute('PATCH', '/posts/posts-by-user/:id', (req, res) =>
  patchPostByUserId(req, res, posts, savePostsToFile),
);

defineRoute('DELETE', '/posts/posts-by-user/:id', (req, res) =>
  deletePostByUserID(req, res, posts, savePostsToFile),
);

export default router;
