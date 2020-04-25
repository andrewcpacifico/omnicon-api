const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const taskRouter = require('./task');

router.get('/health', (req, res) => {
  res.sendStatus(200);
});

router.use('/tasks', taskRouter);

module.exports = router;
