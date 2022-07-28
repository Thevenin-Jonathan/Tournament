const signupEmail = require("./signupEmail");
const forgotPassword = require("./forgotPwdEmail");

module.exports = {
  signup: signupEmail,
  recovery: forgotPassword,
}