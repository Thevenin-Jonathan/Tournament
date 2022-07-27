/**
 * @class BaseError
 */
class BaseError extends Error {
  /**
   * @constructor
   * @param {string} message The message's error
   * @param {number} statusCode The status code HTTP
   * @param {string} name The name's error
   * @param {object} infos The informations' error
   */
  constructor (message, statusCode, name, infos) {
    super (message)
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
    this.infos = infos;
  }
}

module.exports = BaseError;