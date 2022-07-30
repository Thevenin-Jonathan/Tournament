const BaseError = require("./baseError");

/**
 * @class ApiInternalError
 */
class ApiInternalError extends BaseError {
  /**
   * @constructor
   * @param {string} message The message's error
   * @param {number} statusCode The status code HTTP
   * @param {string} name The name's error
   * @param {object} infos The informations' error
   */
  constructor (
    // message = "An error with the server has occured.",
    message = "An error with the server has occured.",
    statusCode = 500,
    name = "Internal-Error",
    infos
  ) {
    super (message, statusCode, name, infos);
  }
}

module.exports = ApiInternalError;