const router = require("express").Router();
const debug = require("debug")("mail");
const nodemailer = require("nodemailer");
const { ApiInternalError } = require("../services/errorHandler");

/** Route to send mail **/
router.post("/", async (_, res) => {
  try {
    console.log("start config !");

    let transporter = nodemailer.createTransport({
      host: process.env.MAILGUN_SMTP_SERVER,
      port: process.env.MAILGUN_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILGUN_SMTP_LOGIN, // generated ethereal user
        pass: process.env.MAILGUN_SMTP_PASSWORD, // generated ethereal password
      },
    });

    console.log("transport create !");
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Test jojo 👻" <war@gmail.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
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