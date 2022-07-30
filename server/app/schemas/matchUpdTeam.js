const joi = require("joi");

module.exports = joi.object({
  team_id: joi.number().min(1)
}).min(1);