const router = require("express").Router();
const v1Router = require('./v1');
const loginRouter = require("./login");
const mailRouter = require("./mail");


// On préfixe les routers
router.use('/api/v1', v1Router);
router.use('/login', loginRouter);
router.use('/mail', mailRouter);

module.exports = router;
