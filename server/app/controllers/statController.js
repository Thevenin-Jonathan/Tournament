const debug = require("debug")("ct-stat");
const statDatamapper = require("../datamappers/stat");
const { Api404Error } = require("../services/errorHandler");

/**
 * Get all player stats from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all player stats
 */
async function getAll(_, res) {
  const stats = await statDatamapper.findAll();
  return res.json(stats);
};

/**
 * Get one player stats from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one player stats
 */
async function getOne(req, res) {
  const id = Number(req.params.id);
  if (id && !isNaN(Number(id))) {
    const stats = await statDatamapper.findById(id);

    if (!stats) throw new Api404Error("User does not exist in DB");
    return res.json(stats);
  } else {
    throw new Api404Error("Invalid id, user not found");
  }
};

module.exports = {
  getAll,
  getOne
}