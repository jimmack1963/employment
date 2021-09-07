/* eslint-disable prefer-const */ // TODO: remove JRM
function getParamsWithDefaults(req, res, next) {
  const parameters = {
    page: req.query.page || 1,
    order: req.query.order || 'title', // you must have an order for pagination, not specified
    limit: req.query.limit || 50
  };
  if (req.query.desc) parameters.order += ' desc';

  parameters.offset = parameters.limit * (parameters.page - 1);
  req.parametersWithDefaults = parameters;
  next();
}

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

module.exports = {
  getParamsWithDefaults,
  notFound,
  errorHandler
};
