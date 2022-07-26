const matchDatamapper = require("../datamappers/match");
const { Api404Error } = require("../services/errorHandler");

/**
 * Get all matchs from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all matchs
 */
async function getAll(_, res) {
  const matchs = await matchDatamapper.findAll();
  return res.json(matchs);
};

/**
 * Get one match from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one match
 */
async function getOne(req, res) {
  const id = req.params.id;
  const match = await matchDatamapper.findById(id);
  return res.json(match);
};

/**
 * Add one match into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created match
 */
async function create(req, res) {
  const match = req.body;
  const newMatch = await matchDatamapper.insertOne(match);
  return res.status(201).json(newMatch);
};

/**
 * Update one match into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated match
 */
async function update(req, res) {
  const id = req.params.id;
  const newMatch = req.body;
  const match = await matchDatamapper.findById(id);

  if (!match) {
    throw new Api404Error("Match does not exist in DB");
  }
  
  const updMatch = await matchDatamapper.updateOne(id, newMatch)
  return res.json(updMatch)
}

/**
 * Delete one match from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one match
 */
async function destroy(req, res) {
  const id = parseInt(req.params.id);
  const match = await matchDatamapper.findById(id);
  
  if (!match) {
    return res.json({message: "Match does not exist in DB"})
  }
  await matchDatamapper.deleteOne(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}