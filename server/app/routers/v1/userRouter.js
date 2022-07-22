const router = require("express").Router();
const controller = require("../../controllers/userController");

router.route("/")
  .get(controller.getAll)
  .post(controller.create);

router.route("/:id")
  .get(controller.getOne)
  .patch(controller.update)
  .delete(controller.destroy);

module.exports = router;
