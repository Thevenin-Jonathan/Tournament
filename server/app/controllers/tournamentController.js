const debug = require("debug")("ct-tournament")
const tournamentDatamapper = require("../datamappers/tournament");
const slugify = require("../services/slugify");
const { ApiError, Api404Error } = require("../services/errorHandler");

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
  const { id, slug } = req.params;
  let tournament = null;

  if (id && !isNaN(Number(id))) {
    tournament = await tournamentDatamapper.findById(id);
  }

  if (slug) {
    tournament = await tournamentDatamapper.findBySlug(slug);
  }

  if (tournament) return res.json(tournament);
  else throw new ApiError(`Invalid ${id ? "id" : "slug"}, tournament not found`);
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
  
  /** Transform title string to slug */
  tournament.slug = slugify(tournament.title);

  /** Verify */
  if (await tournamentDatamapper.findBySlug(tournament.slug)) {
    throw new ApiError(`Slug already exist, invalid title tournament`);
  }

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

  if (id && !isNaN(Number(id))) {
    const tournament = await tournamentDatamapper.findById(id);

    if (!tournament) {
      throw new Api404Error("Tournament does not exist in DB");
    }
  
    await tournamentDatamapper.deleteOne(id);
    return res.status(204).json();
  } else {
    throw new Api404Error("Invalid id, tournament not found");
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}