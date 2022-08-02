const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/teamController");
const validationWrapper = require("../../services/validationWrapper");
const createSchema = require("../../schemas/teamCreate");
const teamUpdUserSchema = require("../../schemas/teamUpdUser");

router.route("/")
  .get(controllerWrapper(controller.getAll))
  .post(
    validationWrapper(createSchema),
    controllerWrapper(controller.create));

router.route("/:id")
  .get(controllerWrapper(controller.getOne))
  .delete(controllerWrapper(controller.destroy));

router.route("/:id/add-user")
  .patch(
    validationWrapper(teamUpdUserSchema),
    controllerWrapper(controller.addUser));

router.route("/:id/remove-user")
  .patch(
    validationWrapper(teamUpdUserSchema),
    controllerWrapper(controller.removeUser));

module.exports = router;