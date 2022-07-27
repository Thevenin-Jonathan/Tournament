const joi = require("joi");

module.exports = joi.object({
  title: joi.string().min(1),
  date: joi.date().min(2),
  description: joi.string().min(10),
  picture_url: joi.string(),
  nb_playground: joi.number(),
  player_limit: joi.number(),
  discipline_id: joi.number(),
  type_id: joi.number(),
  state_id: joi.number(),
  club_id: joi.number()
});
