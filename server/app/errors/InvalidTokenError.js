const BaseError = require("./baseError");

/**
 * @class InvalidTokenError
 */
class InvalidTokenError extends BaseError {
  /**
   * @constructor
   * @param {string} message The message's error
   * @param {number} statusCode The status code HTTP
   * @param {string} name The name's error
   */
  constructor (
    message = "Invalid token.",
    statusCode = 401,
    name = "Invalid_token-Error"
  ) {
    super (message, statusCode, name);
  }
}

module.exports = InvalidTokenError;