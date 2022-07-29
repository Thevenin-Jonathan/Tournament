const router = require("express").Router();
const controllerWrapper = require("../../services/controllerWrapper");
const controller = require("../../controllers/statController");

router.route("/")
  .get(
    controllerWrapper(controller.getAll));

router.route("/:id")
  .get(
    controllerWrapper(controller.getOne));

module.exports = router;
