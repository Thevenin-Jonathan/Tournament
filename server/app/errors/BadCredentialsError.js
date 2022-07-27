const BaseError = require("./baseError");

/**
 * @class BadCredentialsError
 */
class BadCredentialsError extends BaseError {
  /**
   * @constructor
   * @param {string} message The message's error
   * @param {number} statusCode The status code HTTP
   * @param {string} name The name's error
   */
  constructor (
    message = "Bad credentials.",
    statusCode = 401,
    name = "bad_credentials",
  ) {
    super (message, statusCode, name);
  }
}

module.exports = BadCredentialsError;