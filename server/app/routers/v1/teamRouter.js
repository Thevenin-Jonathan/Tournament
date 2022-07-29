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
  .get(controllerWrapper(controller.getOne));


module.exports = router;

