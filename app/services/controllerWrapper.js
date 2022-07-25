/**
 * Controller wrapper with try catch for manage errors
 * @param {function} controllerFunc controller function to try catch
 * @returns {function} controller function as middleware function
 */
module.exports = function wrapper(controllerFunc) {
    return async function tryCatch(req, res, next) {
    try {
      await controllerFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}