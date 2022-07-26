
const BaseError = require("./baseError");

class ApiError extends BaseError {
  constructor (
    message = "An error has occured.",
    statusCode = 400,
    name = "Bad_request"
  ){
    super (message, statusCode, name);
  }
}

module.exports = ApiError;