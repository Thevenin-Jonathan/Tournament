
const BaseError = require("./baseError");

class Api404Error extends BaseError {
  constructor (
    message = "Not found.",
    statusCode = 404,
    name = "404-Error"
  ){
    super (message, statusCode, name);
  }
}

module.exports = Api404Error;