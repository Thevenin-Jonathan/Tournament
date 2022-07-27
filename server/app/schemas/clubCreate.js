const joi = require("joi");

module.exports = joi.object({
  name: joi.string().min(2).required(),
  address: joi.string().min(10).required(),
  phone: joi.string(),
  email: joi.string().email().required(),
  logo_url: joi.string(),
  nb_playground: joi.number().required(),
  website: joi.string().min(5),
  club_ref: joi.string().min(5).required(),
  description: joi.string().min(10)
  });