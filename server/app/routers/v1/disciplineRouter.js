const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/disciplineController");
const validationWrapper = require("../../services/validationWrapper");
const disciplineSchema = require("../../schemas/disciplineSchema");


router.route("/")
  .get(controllerWrapper(controller.getAll))
  .post(
    validationWrapper(disciplineSchema),
    controllerWrapper(controller.create));

router.route("/:id")
  .get(controllerWrapper(controller.getOne))
  .put(
    validationWrapper(disciplineSchema),
    controllerWrapper(controller.update))
  .delete(controllerWrapper(controller.destroy));

module.exports = router;
