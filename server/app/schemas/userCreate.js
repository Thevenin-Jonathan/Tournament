const joi = require("joi");

module.exports = joi.object({
  firstname: joi.string().min(2).required(),
  lastname: joi.string().min(2).required(),
  address: joi.string().min(10),
  birthdate: joi.date().greater('1-1-1930').required(),
  is_active: joi.boolean().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  url_avatar: joi.string(),
  phone: joi.number(),
  player_license: joi.number(),
  club_id: joi.number().required(),
  role_id: joi.number().required(),
  gender_id: joi.number().required()
});