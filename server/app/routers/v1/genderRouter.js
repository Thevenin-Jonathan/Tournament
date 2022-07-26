const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/genderController");

router.route("/")
  .get(controllerWrapper(controller.getAll))
  .post(controllerWrapper(controller.create));

router.route("/:id")
  .get(controllerWrapper(controller.getOne))
  .patch(controllerWrapper(controller.update))
  .delete(controllerWrapper(controller.destroy));

module.exports = router;
