const router = require("express").Router();
const debug = require("debug")("mail");
const nodemailer = require("nodemailer");
const mg = require('nodemailer-mailgun-transport');
const { ApiInternalError } = require("../services/errorHandler");

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

/** Route to send mail **/
router.post("/", async (_, res) => {
  const nodemailerMailgun = nodemailer.createTransport(mg(auth));

  nodemailerMailgun.sendMail({
    from: 'warzonefury@gmail.com',
    to: ['warzonefury@hotmail.fr', 'warzonefury3@hotmail.fr'], // An array if you have multiple recipients.
    cc:'warzonefury3@hotmail.fr',
    bcc:'',
    subject: 'Hey you, awesome!',
    'replyTo': '',
    //You can use "html:" to send HTML email content. It's magic!
    html: '<b>Wow Big powerful letters</b>',
    //You can use "text:" to send plain-text content. It's oldschool!
    text: 'Mailgun rocks, pow pow!'
  }, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
    else {
      console.log(`Response: ${info}`);
    }
  });

  res.json({msg: "Mail sent."});

  // console.log("start config !");

  // let transporter = nodemailer.createTransport({
  //   host: process.env.MAILGUN_SMTP_SERVER,
  //   port: process.env.MAILGUN_SMTP_PORT,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: process.env.MAILGUN_SMTP_LOGIN, // generated ethereal user
  //     pass: process.env.MAILGUN_SMTP_PASSWORD, // generated ethereal password
  //   },
  // });

  // console.log("transport create !");

  // // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: '"Test jojo 👻" <warzonefury@gmail.com>', // sender address
  //   to: "warzonefury@hotmail.fr", // list of receivers
  //   subject: "Hello Tournament✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });

  // debug(info);

  // res.json({msg: "Mail sent."});  
});

module.exports = router;