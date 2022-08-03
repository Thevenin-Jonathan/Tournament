const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/resultController");
const validationWrapper = require("../../services/validationWrapper");
const schema = require("../../schemas/result");


router.route("/")
  .get(controllerWrapper(controller.getAll))
  .post(
    validationWrapper(schema),
    controllerWrapper(controller.create));

router.route("/:id")
  .get(controllerWrapper(controller.getOne))
  .put(
    validationWrapper(schema),
    controllerWrapper(controller.update))
  .delete(controllerWrapper(controller.destroy));

module.exports = router;
