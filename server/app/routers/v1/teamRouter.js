const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/teamController");
const validationWrapper = require("../../services/validationWrapper");
const createUpdateSchema = require("../../schemas/team");

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

router.route("/:id/matches").get(controllerWrapper(controller.getAllMatches))
router.route("/:id/users").get(controllerWrapper(controller.getAllUsers))

module.exports = router;

