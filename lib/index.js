require('dotenv').config();
const express = require('express');

const applyMiddlewares = require('./middlewares');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const config = require('./config');
const logger = require('./util/logger');
const { mongo } = require('./services');
const routerV1 = require('./routes/v1');

async function initialize() {
  await mongo.connect();
}

initialize().then(() => {
  const app = express();
  const port = config.get('port') || 3461;

  applyMiddlewares(app);
  app.use('/v1', routerV1);
  app.use(errorHandlerMiddleware);

  app.listen(port, (err) => {
    if (err) {
      logger.error({ error: err });
      return;
    }

    logger.info(`API (${process.env.NODE_ENV}) listening at ${port}`);
  });
});
