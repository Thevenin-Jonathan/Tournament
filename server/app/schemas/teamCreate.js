const joi = require("joi");

module.exports = joi.object({
    tournament_id: joi.number().min(1).required(),
    user_ids: joi.array().items(
        joi.number().min(1).required()
    ).min(1).max(2).required()
});