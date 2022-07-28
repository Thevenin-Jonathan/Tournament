const debug = require("debug")("mail-handler");
const nodemailer = require("nodemailer");
const clubDatamapper = require("../datamappers/club");
const templates = require("./templates/index");

/** Config nodemailer */
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false, // true only for 465
  auth: {
    user: process.env.AUTH_USER_EMAIL,
    pass: process.env.AUTH_PWD_EMAIL
  },
});

/**
 * Send email to user
 * @param {object} user user informations
 * @param {string} subject email subject
 * @param {("signup"|"recovery")} templateName template key
 * @returns {object} return email send informations
 */
async function sendEmail(user, subject, templateName) {
  const template = templates[templateName];
  const club = await clubDatamapper.findById(user.club_id);
  const infos = await transporter.sendMail({
    from: `"Tournament - ${club.name} 🎾" <${process.env.AUTH_USER_EMAIL}>`,
    to: user.email,
    subject,
    html: template(user),
  });

  return {
    accepted: infos.accepted,
    rejected: infos.rejected
  };
}

module.exports = {
  sendEmail
}