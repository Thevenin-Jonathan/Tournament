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
  const data = req.body;

  /** Add match */
  const matchId = (await matchDatamapper.insertOne(data)).id;

  /** Add team into match */
  for (const teamId of data.team_ids) {
    await matchDatamapper.insertTeam(matchId, teamId)
  }

  /** Get and return all match informations */
  const match = await matchDatamapper.findById(matchId);
  return res.status(201).json(match);
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

/**
 * Add one team into match
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated match
 */
 async function addTeam(req, res) {
  const id = req.params.id;
  const { team_id } = req.body;

  const match = await matchDatamapper.findById(id);
  if (!match) {
    throw new Api404Error("Match does not exist in DB");
  }

  if ((await tournamentDatamapper.findById(match.tournament_id)).state_id >= 3) {
    throw new Api404Error("Unable to change teams, tournament already started");
  }

  if ((await matchHasTeamDatamapper.findByMatchId(id)).length >= 2) {
    throw new Api404Error("The match already has two teams");
  }

  if (await matchHasTeamDatamapper.findByMatchIdAndTeamId(id, team_id)) {
    throw new Api404Error("This team is already in the match");
  }
  
  await matchDatamapper.insertTeam(id, team_id)

  const updMatch = await matchDatamapper.findById(id);
  return res.json(updMatch)
}

/**
 * Remove one team from match
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated match
 */
 async function removeTeam(req, res) {
  const id = req.params.id;
  const { team_id } = req.body;

  const match = await matchDatamapper.findById(id);
  if (!match) {
    throw new Api404Error("Match does not exist in DB");
  }

  if (!await matchHasTeamDatamapper.findByMatchIdAndTeamId(id, team_id)) {
    throw new Api404Error("Team does not exist in this match");
  }

  if ((await tournamentDatamapper.findById(match.tournament_id)).state_id >= 3) {
    throw new Api404Error("Unable to change teams, tournament already started");
  }
  
  await matchDatamapper.deleteTeam(id, team_id)

  const updMatch = await matchDatamapper.findById(id);
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
  addTeam,
  removeTeam,
  destroy
}
