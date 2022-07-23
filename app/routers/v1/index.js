const router = require("express").Router();

const tournamentRouter = require("./tournamentRouter");
const matchRouter = require("./matchRouter");
const teamRouter = require("./teamRouter");
const userRouter = require("./userRouter");

router.use("/tournaments", tournamentRouter);
router.use("/matchs", matchRouter);
router.use("/teams", teamRouter);
router.use("/users", userRouter);

module.exports = router;