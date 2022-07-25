const tournamentDatamapper = require("../datamappers/tournament");

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
  return res.json(newTournament);
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
    return res.json({message: "Tournament does not exist in DB"})
  }

  const updTournament = await tournamentDatamapper.updateOne(id, newData)
  return res.json(updTournament)
}

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
    return res.json({message: "Tournament does not exist in DB"})
  }

  await tournamentDatamapper.deleteOne(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}