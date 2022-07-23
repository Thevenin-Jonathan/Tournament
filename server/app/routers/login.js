const router = require("express").Router();
const userDatamapper = require("../datamappers/user");

/** JWT **/
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

/** Route Login **/
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log("coucou");

  const user = await userDatamapper.findByEmail(email);

  if (!user) {
    return res.status(404).json({message: "Login error email"});
  }

  if (password !== user.password) {
    return res.status(404).json({message: "Login error password"});
  }
  
  const token = jwt.sign(
    {
      id: user.id,
      firstname: user.firstname,
      role_id: user.role_id,
      url_avatar: user.url_avatar
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
    id: user.id,
    firstname: user.firstname,
    role_id: user.role_id,
    url_avatar: user.url_avatar,
    token
  })
});

module.exports = router;