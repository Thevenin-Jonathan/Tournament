const debug = require("debug")("ct-team");
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
  const id = Number(req.params.id);
  if (id && !isNaN(Number(id))) {
    const team = await teamDatamapper.findById(id);

    if (!team) throw new Api404Error("Team does not exist in DB");
    return res.json(team);
  } else {
    throw new Api404Error("Invalid id, team not found");
  }
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
    if (tournament.registered.find(user => user.id === Number(userId))) {
      throw new ApiError("Unable to add user, already on a team");
    }
    users.push(await userDatamapper.findById(userId));
  }

  if ((tournament.discipline_id === 1 || tournament.discipline_id === 2) && users.length === 2) {
    throw new ApiError("Too many user, only one user for this discipline");
  }

  if (tournament.player_limit !== null){    
    if (((tournament.discipline_id <= 2) && (tournament.nb_registered >= tournament.player_limit)) ||
    ((tournament.discipline_id >= 3) && users.length === 1 && (tournament.nb_registered >= tournament.player_limit)) ||
    ((tournament.discipline_id >= 3) && users.length === 2 && (tournament.nb_registered >= tournament.player_limit - 1))) {
      throw new ApiError("Registration not possible, the tournament is full");
    }
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
    throw new ApiError("This discipline is reserved for one men and one women by team");
  }

  // /** Add team */
  const teamId = (await teamDatamapper.insertOne(data.tournament_id)).id;

  // /** Add user into team */
  for (const userId of data.user_ids) {
    await teamDatamapper.insertUser(teamId, userId);
  }

  /** Get and return all tournament informations */
  const updatedTournament = await tournamentDatamapper.findById(tournament.id);
  return res.status(201).json(updatedTournament);
};

/**
 * Add one user into team
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated team
 */
 async function addUser(req, res) {
  const id = Number(req.params.id);
  const { user_id } = req.body;

  /** Verify */
  const team = await teamDatamapper.findById(id);
  if (!team) {
    throw new Api404Error("Team does not exist in DB");
  }
  
  const tournament = await tournamentDatamapper.findById(team.tournament_id);
  if (tournament.state_id >= 2) {
    throw new ApiError("Unable to add user, tournament already generated");
  }

  if ((tournament.discipline_id <= 2 && team.users.length === 1) ||
    (tournament.discipline_id >= 3 && team.users.length === 2)) {
    throw new ApiError("Unable to add user, team is full");
  }

  if (tournament.registered.find(user => user.id === Number(user_id))) {
    throw new ApiError("Unable to add user, already on a team");
  }

  const user = await userDatamapper.findById(user_id);
  if (user.gender_id === 1 && (tournament.discipline_id === 2 || tournament.discipline_id === 4)){
    throw new ApiError("This discipline is reserved for women");
  } else if (user.gender_id === 2 && (tournament.discipline_id === 1 || tournament.discipline_id === 3)) {
    throw new ApiError("This discipline is reserved for men");
  } else if ((tournament.discipline_id === 5 && team.users.length >= 1) && team.users[0].gender_id === user.gender_id) {    
    throw new ApiError("This discipline is reserved for one men and one women by team");
  }
  
  /** Add user into team */
  await teamDatamapper.insertUser(id, user_id);

  /** Get and return all team informations */
  const updTeam = await teamDatamapper.findById(id);
  return res.json(updTeam)
}

/**
 * Remove one user from team
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated team
 */
 async function removeUser(req, res) {
  const id = Number(req.params.id);
  const { user_id } = req.body;

  /** Verify */
  const team = await teamDatamapper.findById(id);
  if (!team) {
    throw new Api404Error("Team does not exist in DB");
  }

  if (!team.users.find(user => user.user_id === Number(user_id))) {
    throw new Api404Error("User does not exist in team");
  }
  
  /** Remove user into team */
  await teamDatamapper.deleteUser(id, user_id);

  /** Get and return all team informations */
  const updTeam = await teamDatamapper.findById(id);
  return res.json(updTeam)
}

/**
 * Delete one team from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one team
 */
async function destroy(req, res) {
  const id = Number(req.params.id);

  if (id && !isNaN(Number(id))) {
    const team = await teamDatamapper.findById(id);

    if (!team) {
      throw new Api404Error("Team does not exist in DB");
    }

    /** Delete team from db */
    await teamDatamapper.deleteOne(id);
    
    /** Get and return all tournament informations */
    const updatedTournament = await tournamentDatamapper.findById(team.tournament_id);
    return res.status(201).json(updatedTournament);
  } else {
    throw new Api404Error("Invalid id, team not found");
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  addUser,
  removeUser,
  destroy
}