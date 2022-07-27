const router = require("express").Router();
const debug = require("debug")("mail");
const nodemailer = require("nodemailer");
const { ApiInternalError } = require("../services/errorHandler");

/** Route to send mail **/
router.post("/", async (_, res) => {
  try {
    console.log("start config !");

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.AUTH_USER_HOTMAIL, // generated ethereal user
        pass: process.env.AUTH_PWD_HOTMAIL, // generated ethereal password
      },
    });

    console.log(transporter);
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Test jojo 👻" <warzonefury@hotmail.fr>', // sender address
      to: "warzonefury3@hotmail.fr", // list of receivers
      subject: "Hello Tournament✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    debug(info);

    res.json({msg: "Mail sent."});
    
  } catch (error) {
    error = new ApiInternalError(error.message);
  }

  
});

module.exports = router;