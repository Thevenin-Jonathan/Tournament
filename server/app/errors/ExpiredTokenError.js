const BaseError = require("./baseError");

/**
 * @class ExpiredTokenError
 */
class ExpiredTokenError extends BaseError {
  /**
   * @constructor
   * @param {string} message The message's error
   * @param {number} statusCode The status code HTTP
   * @param {string} name The name's error
   */
  constructor (
    message = "Expired token.",
    statusCode = 401,
    name = "Expired_token-Error",
  ) {
    super (message, statusCode, name);
  }
}

module.exports = ExpiredTokenError;