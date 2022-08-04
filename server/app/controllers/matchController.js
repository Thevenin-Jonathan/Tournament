const debug = require("debug")("ct-match");
const matchDatamapper = require("../datamappers/match");
const tournamentDatamapper = require("../datamappers/tournament");
const { ApiError, Api404Error } = require("../services/errorHandler");

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
  if (id && !isNaN(Number(id))) {
    const match = await matchDatamapper.findById(id);

    if (!match) throw new Api404Error("Match does not exist in DB");
    return res.json(match);
  } else {
    throw new Api404Error("Invalid id, match not found");
  }
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

  /** Verify */
  if ((await tournamentDatamapper.findById(data.tournament_id)).state_id >= 3) {
    throw new ApiError("Unable to add team, tournament already started");
  }

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

  /** Verify */
  if (!match) {
    throw new Api404Error("Match does not exist in DB");
  }
  
  const updMatch = await matchDatamapper.updateOne(id, req.body)
  return res.json(updMatch)
}

/**
 * Update match score and state
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated match
 */
 async function updateScore(req, res) {
  const id = req.params.id;
  const data = req.body.match;
  const match = await matchDatamapper.findById(id);

  /** Verify */
  if (!match) {
    throw new Api404Error("Match does not exist in DB");
  }

  if (!match.team.every(team => data.some(matchTeam => Number(matchTeam.team_id) === team.team_id))) {
    throw new Api404Error("One team is not participating in this match");
  };

  if ((await tournamentDatamapper.findById(match.tournament_id)).state_id >= 4) {
    throw new Api404Error("Unable to change scores, tournament is closed");
  };

  const resultT1 = data[0].result_id
  const resultT2 = data[1].result_id

  /** set score for team 1 */
  const isWinnerT1 = resultT1 === 3 ? true : resultT1 !== 4 && resultT2 === 4 ? true : false;
  await matchDatamapper.setScore(id, data[0].team_id, data[0].result_id, isWinnerT1);
  
  /** set score for team 2 */
  const isWinnerT2 = resultT2 !== 4 && isWinnerT1 === false ? true : false;
  await matchDatamapper.setScore(id, data[1].team_id, data[1].result_id, isWinnerT2);

  /** change match state to "closed" */
  await matchDatamapper.updateOne(id, { state_id: 4 });

  const updMatch = await matchDatamapper.findById(id);
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

  /** Verify */
  const match = await matchDatamapper.findById(id);
  if (!match) {
    throw new Api404Error("Match does not exist in DB");
  }

  if ((await tournamentDatamapper.findById(match.tournament_id)).state_id >= 3) {
    throw new ApiError("Unable to change teams, tournament already started");
  }

  if (match.team.some(team => team.team_id === team_id)) {
    throw new ApiError("This team is already in the match");
  }

  if (match.team.length >= 2) {
    throw new ApiError("The match already has two teams");
  }
  
  /** Add team into match */
  await matchDatamapper.insertTeam(id, team_id)

  /** Get and return all match informations */
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

  /** Verify */
  const match = await matchDatamapper.findById(id);
  if (!match) {
    throw new Api404Error("Match does not exist in DB");
  }
  
  if (!match.team.some(team => team.team_id === team_id)) {
    throw new ApiError("Team does not exist in this match");
  }

  if ((await tournamentDatamapper.findById(match.tournament_id)).state_id >= 3) {
    throw new ApiError("Unable to change teams, tournament already started");
  }
  
  /** Remove team from match */
  await matchDatamapper.deleteTeam(id, team_id)

  /** Get and return all match informations */
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
  
  if (id && !isNaN(Number(id))) {
    const match = await matchDatamapper.findById(id);

    /** Verify */
    if (!match) {
      throw new Api404Error("Match does not exist in DB");
    }
  
    await matchDatamapper.deleteOne(id);
  return res.status(204).json();
  } else {
    throw new Api404Error("Invalid id, match not found");
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  updateScore,
  addTeam,
  removeTeam,
  destroy
}
