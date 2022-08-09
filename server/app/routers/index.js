const router = require("express").Router();
const v1Router = require('./v1');
const routerLogin = require("./login");
const { Api404Error } = require("../services/errorHandler");


// On préfixe les routers
router.use('/api/v1', v1Router);
router.use('/login', routerLogin);

// 404 handler
router.use(() => {
  throw new Api404Error();
});

module.exports = router;