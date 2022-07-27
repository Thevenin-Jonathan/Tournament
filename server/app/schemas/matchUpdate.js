const joi = require("joi");

module.exports = joi.object({
  note: joi.string().min(0),
  state_id: joi.string().min(1),
  tournament_id: joi.string().min(1)
});