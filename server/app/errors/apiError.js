const BaseError = require("./baseError");

/**
 * @class ApiError
 */
class ApiError extends BaseError {
  /**
   * @constructor
   * @param {string} message The message's error
   * @param {number} statusCode The status code HTTP
   * @param {string} name The name's error
   */
  constructor (
    message = "An error has occured.",
    statusCode = 400,
    name = "Bad_request"
  ){
    super (message, statusCode, name);
  }
}

module.exports = ApiError;