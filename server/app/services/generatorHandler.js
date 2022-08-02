const debug = require("debug")("generate-handler");
const { ValidationError, ApiError } = require("./errorHandler");
const allVsAllSchema = require("../schemas/allVsAll");
const generateAllVsAll = require("./generatorFunc/allVsAll");

/**
 * Generate matches grid depending of the tournament type
 * @param {number} typeId type identifiant
 * @param {number[]} teams array of team id of each team
 * @returns {[[...[number, number]]]} return a matches grid
 */
async function generate(typeId, teams) {  
  try {
    switch (typeId) {
      case 1:
        await allVsAllSchema.validateAsync(teams);
        return generateAllVsAll(teams)
      case 2:
        break;
      case 3:
        break;
    }
  } catch (error) {
    if(error.name = "ValidationError") throw new ValidationError(error.message);
    throw new ApiError("Matches generation failed");
  }
}

module.exports = {
  generate
}