const router = require("express").Router();

/** JWT **/
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

/** Route Login **/
router.post("/", (req, res) => {
  const { password, email } = req.body;

  if (password && email) {
    const token = jwt.sign(
      {
        id: "1",
        role: "admin",
      },
      jwtSecret,
      {
        algorithm: 'HS256', 
        expiresIn: '3h' 
      }
    )

    res.json({
      // tests
      logged: true, 
      id: "1",
      firstName: "Jonathan",
      LastName: "Thevenin",
      avatar: "https://ca.slack-edge.com/T031GD7HYJE-U032A3NU6FK-b572cbb49793-512",
      token
    })
  }
  else {
    res.status(401).json({
      errorCode: "401",
      msg: "Unauthorized"
    })
  }
})

module.exports = router;