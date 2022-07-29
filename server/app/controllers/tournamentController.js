const tournamentDatamapper = require("../datamappers/tournament");
const { Api404Error } = require("../services/errorHandler");

/**
 * Get and return all tournaments from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all tournaments
 */
async function getAll(_, res) {
  const tournaments = await tournamentDatamapper.findAll();
  return res.json(tournaments);
};

/**
 * Get one tournament from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one tournament
 */
async function getOne(req, res) {
  const id = req.params.id;
  const tournament = await tournamentDatamapper.findById(id);
  return res.json(tournament);
};

/**
 * Add one tournament into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created tournament
 */
async function create(req, res) {
  const tournament = req.body;
  const newTournament = await tournamentDatamapper.insertOne(tournament);
  return res.status(201).json(newTournament);
};

/**
 * Update one tournament into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated tournament
 */
async function update(req, res) {
  const id = req.params.id;
  const newData = req.body;
  const tournament = await tournamentDatamapper.findById(id);

  if (!tournament) {
    throw new Api404Error("Tournament does not exist in DB");
  }

  const updatedTournament = await tournamentDatamapper.updateOne(id, newData)
  return res.json(updatedTournament)
};

/**
 * Delete one tournament from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one tournament
 */
async function destroy(req, res) {
  const id = req.params.id;
  const tournament = await tournamentDatamapper.findById(id);

  if (!tournament) {
    throw new Api404Error("Tournament does not exist in DB");
  }

  await tournamentDatamapper.deleteOne(id);
  return res.status(204).json();
};

/**
 * Get all matches by tournament from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with all matches of a tournament
 */
 async function getAllMatches(req, res) {
  const id = req.params.id;
  const matches = await tournamentDatamapper.findAllMatches(id);

  if (matches.length === 0) {
    throw new Api404Error("There is no match in this tournament");
  }
  return res.json(matches);
};

/**
 * Get all matches of a team by tournament from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with all matches of a tournament
 */
 async function getAllMatchesByTeam(req, res) {
  // const id = req.params.id;
  // const teamId = req.params.teamId;
  const {id, teamId} = req.params;
  const matches = await tournamentDatamapper.findAllMatchesByTeam(id, teamId);

  if (matches.length === 0) {
    throw new Api404Error("There is no match for this team in this tournament");
  }
  return res.json(matches);
};

  /**
 * Update one tournament of a team into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated team
 */
   async function updateTeam(req, res) {
    const {id, teamId} = req.params.id;
    const {name} = req.body
    const team = await teamDatamapper.findById(id);
  
    if (!team) {
      throw new Api404Error("team does not exist in DB");
    }

    if (await teamDatamapper.findByName(name)) {
      throw new ApiError("This name is already in use");
    }

    const updatedTeam = await teamDatamapper.updateOne(id, name)
    return res.json(updatedTeam)
  }


module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy,
  getAllMatches,
  getAllMatchesByTeam,
  updateTeam
}