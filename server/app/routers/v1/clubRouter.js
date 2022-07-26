const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/clubController");
const validationWrapper = require("../../services/validationWrapper");
const createSchema = require("../../schemas/clubCreate");
const updateSchema = require("../../schemas/clubUpdate");

router.route("/")
  .get(controllerWrapper(controller.getAll))
  .post(
    controllerWrapper(controller.create));

router.route("/:id")
  .get(controllerWrapper(controller.getOne))
  .patch(controllerWrapper(controller.update))
  .delete(controllerWrapper(controller.destroy));

module.exports = router;
