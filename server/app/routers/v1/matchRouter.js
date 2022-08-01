const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/matchController");
const validationWrapper = require("../../services/validationWrapper");
const createSchema = require("../../schemas/matchCreate");
const updateSchema = require("../../schemas/matchUpdate");
const matchUpdTeamSchema = require("../../schemas/matchUpdTeam");

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

router.route("/:id/add-team")
  .patch(
    validationWrapper(matchUpdTeamSchema),
    controllerWrapper(controller.addTeam));

router.route("/:id/remove-team")
  .patch(
    validationWrapper(matchUpdTeamSchema),
    controllerWrapper(controller.removeTeam));

module.exports = router;