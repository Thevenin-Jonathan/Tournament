const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("Hello Tournament")
})

module.exports = router;
