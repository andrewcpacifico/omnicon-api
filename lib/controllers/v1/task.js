const moment = require('moment');

const { Task } = require('../../models');

const TaskController = {
  async list(req, res) {
    const { dueDate } = req.query;
    const filters = {};

    if (dueDate) {
      filters.dueDate = {
        $gte: moment.utc(dueDate, 'YYYY-MM-DD'),
        $lt: moment.utc(dueDate, 'YYYY-MM-DD').add(1, 'day'),
      };
    }

    const tasks = await Task.find(filters);

    res.json(tasks);
  },
};

module.exports = TaskController;
