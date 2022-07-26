class BaseError extends Error {
  constructor (message, statusCode, name, infos) {
    super (message)
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
    this.infos = infos;
  }
}

module.exports = BaseError;