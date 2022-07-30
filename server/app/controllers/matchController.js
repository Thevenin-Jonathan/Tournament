const debug = require("debug")("ct-match");
const matchDatamapper = require("../datamappers/match");
const matchHasTeamDatamapper = require("../datamappers/matchHasTeam");
const tournamentDatamapper = require("../datamappers/tournament");
const { Api404Error } = require("../services/errorHandler");

/**
 * Get all matches from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all matches
 */
async function getAll(_, res) {
  const matches = await matchDatamapper.findAll();
  return res.json(matches);
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
  const match = await matchDatamapper.findById(id);

  if (!match) {
    throw new Api404Error("Match does not exist in DB");
  }
  
  const updMatch = await matchDatamapper.updateOne(id, req.body)
  return res.json(updMatch)
}
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

/**
 * Get all teams
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with all teams
 */
 async function getAllTeams(req, res) {
  const id = req.params.id;
  const teams = await matchDatamapper.findAllTeams(id);
  return res.json(teams);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy,
  getAllTeams
}
