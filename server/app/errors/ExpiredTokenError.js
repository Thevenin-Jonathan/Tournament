
const BaseError = require("./baseError");

class ExpiredTokenError extends BaseError {
  constructor (
    message = "Expired token.",
    statusCode = 401,
    name = "Expired_token-Error",
  ) {
    super (message, statusCode, name);
  }
}

module.exports = ExpiredTokenError;