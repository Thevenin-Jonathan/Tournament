const joi = require("joi");

module.exports = joi.object({
  tournament_id: joi.number().min(1).required(),
  teams: joi.array().items(
      joi.number().required()
  ).length(2).required()
});