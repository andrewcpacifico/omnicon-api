const ev = require('express-validation');

const logger = require('../util/logger');

function badRequestResponse(res, options) {
  res.status(400);
  res.json({
    status: 'INVALID_REQUEST',
    errors: options.errors,
  });
}

function errorResponse(res, err, options) {
  options = options || {}; // eslint-disable-line
  logger.error(err);

  res.status(500);
  res.json({
    status: 'ERROR',
    message: options.message || 'Internal server error',
  });
}

function defaultErrorHandler(err, req, res, next) { // eslint-disable-line
  if (err instanceof ev.ValidationError) {
    return badRequestResponse(res, err);
  }

  if (
    err instanceof SyntaxError
      && err.statusCode === 400
      && err.type === 'entity.parse.failed'
  ) {
    return badRequestResponse(res, { errors: 'Invalid input JSON' });
  }

  return errorResponse(res, err);
}

module.exports = defaultErrorHandler;
