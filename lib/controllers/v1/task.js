const moment = require('moment');

const { Task } = require('../../models');

const TaskController = {
  async list(req, res) {
    const { dueDate, limit = 10, offset = 0 } = req.query;
    const filters = {};

    if (dueDate) {
      filters.dueDate = {
        $gte: moment.utc(dueDate, 'YYYY-MM-DD'),
        $lt: moment.utc(dueDate, 'YYYY-MM-DD').add(1, 'day'),
      };
    }

    const tasks = await Task.find(filters)
      .skip(offset)
      .limit(limit);

    res.json(tasks);
  },
};

module.exports = TaskController;
