const bodyParser = require('body-parser');

const metricsMiddleware = require('./metrics');

function applyMiddlewares(app) {
  app.use(bodyParser.json());
  app.use(metricsMiddleware());
}

module.exports = applyMiddlewares;
