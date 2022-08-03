const BaseError = require("./baseError");

/**
 * @class ApiError
 */
class ValidationError extends BaseError {
  /**
   * @constructor
   * @param {string} message The message's error
   * @param {number} statusCode The status code HTTP
   * @param {string} name The name's error
   */
  constructor (
    message,
    statusCode = 400,
    name = "Validation_error"
  ){
    super (message, statusCode, name);
    this.message = format(message);
  }
}

function format(text) {      
  const errMsg = text.replaceAll('"', "");
  return errMsg.substring(0,1).toUpperCase() + errMsg.substring(1);
}

module.exports = ValidationError;