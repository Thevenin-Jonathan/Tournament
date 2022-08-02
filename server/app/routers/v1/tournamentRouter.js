const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/tournamentController");
const validationWrapper = require("../../services/validationWrapper");
const createSchema = require("../../schemas/tournamentCreate");
const updateSchema = require("../../schemas/tournamentUpdate");

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

router.route("/slug/:slug")
  .get(controllerWrapper(controller.getOne));

router.route("/:id/generate")
  .get(controllerWrapper(controller.generate)); 

module.exports = router;
