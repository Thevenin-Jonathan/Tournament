const joi = require("joi");

module.exports = joi.object({
    tournament_id: joi.number().max(2).required()
});