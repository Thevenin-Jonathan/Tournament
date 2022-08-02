const debug = require("debug")("vl-wrapper");
const { ValidationError } = require("./errorHandler");

/**
 * Validation wrapper with try catch for manage errors
 * @param {object} schema joi schema
 * @returns {function} validation function as middleware function
 */
 module.exports = function wrapper(schema) {
  return async function tryCatch(req, _, next) {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      next(new ValidationError(error.message));
    }
  }
}