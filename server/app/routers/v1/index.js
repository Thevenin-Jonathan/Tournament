const router = require("express").Router();

const tournamentRouter = require("./tournamentRouter");
const matchRouter = require("./matchRouter");
const teamRouter = require("./teamRouter");
const userRouter = require("./userRouter");

router.use("/tournament", tournamentRouter);
router.use("/match", matchRouter);
router.use("/team", teamRouter);
router.use("/user", userRouter);

module.exports = router;