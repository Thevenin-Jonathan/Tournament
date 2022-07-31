const joi = require("joi");

module.exports = joi.object({
  tournament_id: joi.number().min(1).required(),
  team_ids: joi.array().items(
      joi.number().required()
  ).length(2).required()
});