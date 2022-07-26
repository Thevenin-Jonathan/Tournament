const joi = require("joi");

module.exports = joi.object({
    name: joi.string().min(1).required()
});