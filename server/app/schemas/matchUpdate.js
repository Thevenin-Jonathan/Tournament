const joi = require("joi");

module.exports = joi.object({
  note: joi.string(),
  state_id: joi.string().min(1),
  tournament_id: joi.string().min(1)
});