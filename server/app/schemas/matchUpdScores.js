const joi = require("joi");

const teamSchema = joi.object({
  team_id: joi.number().min(1).required(),
  result_id: joi.number().min(1).max(4).required()
}).required();

module.exports = joi.object({
  match: joi.array().items(
    teamSchema
  ).length(2).required()
}).required();