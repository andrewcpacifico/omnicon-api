const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: 'string',
}, {
  autoCreate: true,
});

module.exports = mongoose.model('Task', schema);
