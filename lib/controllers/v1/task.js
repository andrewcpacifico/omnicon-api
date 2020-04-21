const { Task } = require('../../models');

const TaskController = {
  async list(req, res) {
    const tasks = await Task.find({});
    res.json(tasks);
  },
};

module.exports = TaskController;
