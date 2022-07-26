
const BaseError = require("./baseError");

class BadCredentialsError extends BaseError {
  constructor (
    message = "Bad credentials.",
    statusCode = 401,
    name = "bad_credentials",
  ) {
    super (message, statusCode, name);
  }
}

module.exports = BadCredentialsError;