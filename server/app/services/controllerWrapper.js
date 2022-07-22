module.exports = function wrapper(controller) {
    return async function tryCatch(req, res, next) {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}