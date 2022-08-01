const teamDatamapper = require("../datamappers/team");
const tournamentDatamapper = require("../datamappers/tournament");
const userDatamapper = require("../datamappers/user");
const { ApiError, Api404Error } = require("../services/errorHandler");

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
  const data = req.body;

  /** Verify */
  const tournament = await tournamentDatamapper.findById(data.tournament_id);
  if (tournament.state_id >= 3) {
    throw new ApiError("Unable to add team, tournament already started");
  }

  /** Get each info users */
  const users = [];
  for (const userId of data.user_ids) {
    users.push(await userDatamapper.findById(userId));
  }

  if ((tournament.discipline_id === 1 || tournament.discipline_id === 2) && users.length === 2) {
    throw new ApiError("Too many user, only one user for this discipline");
  }

  for (const user of users) {
    if (user.gender_id === 1 && (tournament.discipline_id === 2 || tournament.discipline_id === 4)){
      throw new ApiError("This discipline is reserved for women");
    } else if (user.gender_id === 2 && (tournament.discipline_id === 1 || tournament.discipline_id === 3)) {
      throw new ApiError("This discipline is reserved for men");
    }
  }

  if ((users.length === 2 && tournament.discipline_id === 5) 
    && ((users[0].gender_id === 1 && users[1].gender_id === 1) || (users[0].gender_id === 2 && users[1].gender_id === 2))) {
    throw new ApiError("This discipline is reserved for one men and one women");
  }

  /** Add team */
  const teamId = (await teamDatamapper.insertOne(data.tournament_id)).id;

  /** Add user into team */
  for (const userId of data.user_ids) {
    await teamDatamapper.insertUser(teamId, userId);
  }

  /** Get and return all team informations */
  const team = await teamDatamapper.findById(teamId);
  return res.status(201).json(team);
};

//todo ameliore le get tournament (nb inscrit, id user, id user manager)
//todo verif nb inscrit
//todo insertUser
//todo removeUser

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

module.exports = {
  getAll,
  getOne,
  create,
  destroy
}