const debug = require("debug")("error-handler");
const morgan = require("morgan");
const ApiError = require("../errors/apiError");
const Api404Error = require("../errors/api404Error");
const ApiInternalError = require("../errors/apiInternalError");
const BadCredentialsError = require("../errors/BadCredentialsError");
const ExpiredTokenError = require("../errors/ExpiredTokenError");
const InvalidTokenError = require("../errors/InvalidTokenError");
const ValidationError = require("../errors/validationError");

/**
 * Error handler middleware.
 * @function errorHandler
 * @param {Error} err - Error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} _ - Express next middleware function. (not used)
 */

async function errorHandler(err, _, res, _) {

  if (process.env.NODE_ENV === "development") {
    debug(err.statusCode)
    debug(err.message)
    debug(err.stack)
  }

  if (err instanceof ApiInternalError && process.env.NODE_ENV === "production") {
    err.message = "An error with the server has occured."
  }

  if (!err.statusCode || isNaN(Number(err.statusCode))) {
    err = new ApiInternalError();
  }

  morgan.token('message', function(_, _) {
    return err.message;
  });

  res.status(err.statusCode).json({
    code: err.statusCode,
    name: err.name,
    message: err.message
});
}

module.exports = {
  errorHandler,
  ApiError,
  Api404Error,
  ApiInternalError,
  BadCredentialsError,
  ExpiredTokenError,
  InvalidTokenError,
  ValidationError
}