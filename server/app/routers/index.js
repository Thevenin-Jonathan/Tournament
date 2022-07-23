const router = require("express").Router();
const v1Router = require('./v1');
const routerLogin = require("./login");


// On préfixe les routers
router.use('/api/v1', v1Router);
router.use('/login', routerLogin);

module.exports = router;
