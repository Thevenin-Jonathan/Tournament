const joi = require("joi");

module.exports = joi.object({
  name: joi.string().min(2).required()
});