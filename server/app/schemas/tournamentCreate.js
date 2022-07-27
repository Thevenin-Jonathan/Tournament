const joi = require("joi");

module.exports = joi.object({
  title: joi.string().min(1).required(),
  date: joi.date().min(2).required(),
  description: joi.string().min(10),
  picture_url: joi.string(),
  nb_playground: joi.number().required(),
  player_limit: joi.number(),
  discipline_id: joi.number().required(),
  type_id: joi.number().required(),
  state_id: joi.number().required(),
  club_id: joi.number().required()
});
