const joi = require("joi");

module.exports = joi.object({
  name: joi.string().min(2),
  address: joi.string().min(10),
  phone: joi.string(),
  email: joi.string().email(),
  logo_url: joi.string(),
  nb_playground: joi.number(),
  website: joi.string().min(5),
  club_ref: joi.string().min(5),
  description: joi.string().min(10)
  });