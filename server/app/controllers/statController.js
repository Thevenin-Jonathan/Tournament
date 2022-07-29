const debug = require("debug")("ct-stat");
const statDatamapper = require("../datamappers/stat");

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
  const id = req.params.id;
  const stats = await statDatamapper.findById(id);
  return res.json(stats);
};

module.exports = {
  getAll,
  getOne
}