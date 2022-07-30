const debug = require("debug")("vl-wrapper");
const { ApiError } = require("../services/errorHandler");

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
      const errMsg = error.message.replaceAll('"', "");
      const msg = errMsg.substring(0,1).toUpperCase() + errMsg.substring(1);
      next(new ApiError(msg));
    }
  }
}