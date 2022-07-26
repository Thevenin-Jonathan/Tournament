const router = require("express").Router();

const tournamentRouter = require("./tournamentRouter");
const matchRouter = require("./matchRouter");
const teamRouter = require("./teamRouter");
const userRouter = require("./userRouter");
const clubRouter = require("./clubRouter");
const genderRouter = require("./genderRouter");
const typeRouter = require("./typeRouter");


router.use("/tournaments", tournamentRouter);
router.use("/matchs", matchRouter);
router.use("/teams", teamRouter);
router.use("/users", userRouter);
router.use("/clubs", clubRouter);
router.use("/gender", genderRouter);
router.use("/types", typeRouter);


module.exports = router;