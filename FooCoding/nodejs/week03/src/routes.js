const express = require('express');
const router = express.Router();
// Import the todoController
const controller = require('./controllers/todoController');
// Import the validator to check req.body paramethers
const validator = require('./middleware/validate');

// Define routes
router.get('/todos', controller.getAll);
router.get('/todos/:id', controller.getById);
router.post('/todos', validator.schema, controller.create);
router.patch('/todos/:id', validator.schemaUpdate, controller.update);
router.delete('/todos/:id', controller.delete);

module.exports = router;
