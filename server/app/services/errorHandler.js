const debug = require("debug")("error-handler");
const ApiError = require("../errors/apiError");
const Api404Error = require("../errors/api404Error");
const ApiInternalError = require("../errors/apiInternalError");
const BadCredentialsError = require("../errors/BadCredentialsError");
const ExpiredTokenError = require("../errors/ExpiredTokenError");
const InvalidTokenError = require("../errors/InvalidTokenError");

/**
 * Error handler middleware.
 * @function errorHandler
 * @param {Error} err - Error object.
 * @param {Object} _ - Express request object. (not used)
 * @param {Object} res - Express response object.
 * @param {Function} __ - Express next middleware function. (not used)
 */
async function errorHandler(err, _, res, __) {

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
  InvalidTokenError
}