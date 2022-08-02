const joi = require("joi");

module.exports = joi.array().items(
  joi.number().min(1)
).min(2).required();