const express = require('express');

const { task } = require('../../controllers/v1');

const taskRouter = express.Router();

taskRouter.route('/')
  .get(task.list);

module.exports = taskRouter;
