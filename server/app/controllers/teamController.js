const teamDatamapper = require("../datamappers/team");
const { Api404Error } = require("../services/errorHandler");

/**
 * Get and return all teams from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all teams
 */
async function getAll(_, res) {
  const teams = await teamDatamapper.findAll();
  return res.json(teams);
};

/**
 * Get one team from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one team
 */
async function getOne(req, res) {
  const id = req.params.id;
  const team = await teamDatamapper.findById(id);
  return res.json(team);
};

/**
 * Add one team into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created team
 */
async function create(req, res) {
  const tournamentId = req.body.tournament_id;
  const newTeam = await teamDatamapper.insertOne(tournamentId);
  return res.status(201).json(newTeam);
};

/**
 * Delete one team from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one team
 */
async function destroy(req, res) {
  const id = req.params.id;
  const team = await teamDatamapper.findById(id);

  if (!team) {
    throw new Api404Error("Team does not exist in DB");
  }

  await teamDatamapper.deleteOne(id);
  return res.status(204).json();
};

/**
 * Get all matches
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with all matches
 */
 async function getAllMatches(req, res) {
  const id = req.params.id;
  const team = await teamDatamapper.findAllMatches(id);
  return res.json(team);
};

module.exports = {
  getAll,
  getOne,
  create,
  destroy,
  getAllMatches
}