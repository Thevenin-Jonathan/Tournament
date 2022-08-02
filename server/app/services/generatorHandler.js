const debug = require("debug")("generate-handler");
const { ValidationError, ApiError } = require("./errorHandler");
const allVsAllSchema = require("../schemas/allVsAll");
const generateAllVsAll = require("./generatorFunc/allVsAll");

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