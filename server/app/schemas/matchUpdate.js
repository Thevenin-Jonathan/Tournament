const joi = require("joi");

module.exports = joi.object({
  note: joi.string(),
  state_id: joi.number().min(1)
}).min(1);