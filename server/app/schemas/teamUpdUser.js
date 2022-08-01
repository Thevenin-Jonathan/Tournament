const joi = require("joi");

module.exports = joi.object({
    user_id: joi.number().min(1)
}).min(1);