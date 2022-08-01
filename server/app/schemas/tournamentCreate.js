const joiBase = require("joi");
const joiDate = require("@joi/date");
const joi = joiBase.extend(joiDate);

module.exports = joi.object({
  title: joi.string().min(5).required(),
  date: joi.date().utc().format(["DD-MM-YYYY","DD/MM/YYYY"]).required(),
  description: joi.string().min(10),
  picture_url: joi.string(),
  nb_playground: joi.number().required(),
  player_limit: joi.number(),
  discipline_id: joi.number().required(),
  type_id: joi.number().required(),
  state_id: joi.number(),
  club_id: joi.number()
});
