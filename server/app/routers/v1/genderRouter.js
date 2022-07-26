const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/genderController");
const validationWrapper = require("../../services/validationWrapper");
const createUpdateSchema = require("../../schemas/genderCreate");

router.route("/")
  .get(controllerWrapper(controller.getAll))
  .post(
    validationWrapper(createUpdateSchema),
    controllerWrapper(controller.create));

router.route("/:id")
  .get(controllerWrapper(controller.getOne))
  .patch(
    validationWrapper(createUpdateSchema),
    controllerWrapper(controller.update))
  .delete(controllerWrapper(controller.destroy));

module.exports = router;
