const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/matchController");
const validationWrapper = require("../../services/validationWrapper");
const createSchema = require("../../schemas/matchCreate");
const updateSchema = require("../../schemas/matchUpdate");

router.route("/")
  .get(controllerWrapper(controller.getAll))
  .post(
    validationWrapper(createSchema),
    controllerWrapper(controller.create));

router.route("/:id")
  .get(controllerWrapper(controller.getOne))
  .patch(
    validationWrapper(updateSchema),
    controllerWrapper(controller.update))
  .delete(controllerWrapper(controller.destroy));

  router.route("/:id/teams").get(controllerWrapper(controller.getAllTeams))


module.exports = router;