
const BaseError = require("./baseError");

class InvalidTokenError extends BaseError {
  constructor (
    message = "Invalid token.",
    statusCode = 401,
    name = "Invalid_token-Error"
  ) {
    super (message, statusCode, name);
  }
}

module.exports = InvalidTokenError;