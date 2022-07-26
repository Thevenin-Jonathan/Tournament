const joi = require("joi");

module.exports = joi.object({
    tournament_id: joi.number().min(1).max(5).required()
});