
const BaseError = require("./baseError");

class ApiInternalError extends BaseError {
  constructor (
    message = "An error with the server has occured.",
    statusCode = 500,
    name = "Internal-Error",
    infos
  ) {
    super (message, statusCode, name, infos);
  }
}

module.exports = ApiInternalError;