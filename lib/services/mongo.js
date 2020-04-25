const mongoose = require('mongoose');

const config = require('../config');
const { logger } = require('../util');

const MongoService = {
  connect() {
    return new Promise((resolve, reject) => {
      const { host, database } = config.get('mongo');
      const url = `mongodb://${host}/${database}`;

      logger.info('Connecting do mongo database');
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = mongoose.connection;
      db.on('error', reject);
      db.once('open', () => {
        logger.info('Mongo connection stablished');
        resolve();
      });
    });
  },
};

module.exports = MongoService;
