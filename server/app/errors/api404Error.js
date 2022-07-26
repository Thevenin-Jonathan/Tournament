const BaseError = require("./baseError");

/**
 * @class Api404Error
 */
class Api404Error extends BaseError {
  /**
   * @constructor
   * @param {string} message The message's error
   * @param {number} statusCode The status code HTTP
   * @param {string} name The name's error
   */
  constructor (
    message = "Not found.",
    statusCode = 404,
    name = "404-Error"
  ){
    super (message, statusCode, name);
  }
}

module.exports = Api404Error;