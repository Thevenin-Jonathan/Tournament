const joi = require("joi");

module.exports = joi.object({
  firstname: joi.string().min(2),
  lastname: joi.string().min(2),
  address: joi.string().min(10),
  birthdate: joi.date().greater('1-1-1930'),
  is_active: joi.boolean(),
  email: joi.string().email(),
  password: joi.string(),
  url_avatar: joi.string(),
  phone: joi.string(),
  player_license: joi.string(),
  club_id: joi.number(),
  role_id: joi.number(),
  gender_id: joi.number()
});