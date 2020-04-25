const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  createdAt: Date,
  updatedAt: Date,
  dueDate: {
    type: Date,
    index: true,
  },
}, {
  autoCreate: true,
});

module.exports = mongoose.model('Task', schema);
