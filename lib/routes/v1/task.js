const express = require('express');
const { Joi, validate } = require('express-validation');

const { task } = require('../../controllers/v1');

const taskRouter = express.Router();

taskRouter.route('/')
  .get(validate({
    query: Joi.object({
      dueDate: Joi.date(),
    }),
  }), task.list);

module.exports = taskRouter;
