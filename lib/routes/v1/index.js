const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
