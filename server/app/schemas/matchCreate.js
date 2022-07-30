const joi = require("joi");

module.exports = joi.object({
  tournament_id: joi.number().min(1).required(),
  team: joi.array().items(
    joi.object({
      id: joi.number().required()
    })
  ).min(1).max(2).required()
});