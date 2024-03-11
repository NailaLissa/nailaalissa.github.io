const joi = require('joi');

// validator for req.body paramethers
exports.schema = (req, res, next) => {
  // define Joi schemas for data validation and ID
  const taskSchema = joi.object({
    title: joi.string().required(),
    description: joi.string(),
    completed: joi.boolean().default(false),
  });

  // error handling
  const { error, value } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // calling the next middleware
  next();
};

exports.schemaUpdate = (req, res, next) => {
  const validateUpdate = joi.object({
    title: joi.string().required(),
    description: joi.string(),
    completed: joi.boolean(),
  });

  // error handling
  const { error, value } = validateIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // calling the next validator
  next();
};
