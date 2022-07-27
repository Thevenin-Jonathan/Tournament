const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/typeController");
const validationWrapper = require("../../services/validationWrapper");
const createSchema = require("../../schemas/typeCreate");
const updateSchema = require("../../schemas/typeUpdate");

router.route("/")
  .get(controllerWrapper(controller.getAll))
  .post(
    validationWrapper(createSchema),
    controllerWrapper(controller.create));

router.route("/:id")
  .get(controllerWrapper(controller.getOne))
  .put(
    validationWrapper(updateSchema),
    controllerWrapper(controller.update))
  .delete(controllerWrapper(controller.destroy));

module.exports = router;
