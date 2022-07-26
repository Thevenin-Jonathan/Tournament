const teamDatamapper = require("../datamappers/team");

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
  const name = req.body.name;
  const newTeam = await teamDatamapper.insertOne(name);
  return res.json(newTeam);
};

/**
 * Update one gender into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated gender
 */
async function update(req, res) {
  const id = parseInt(req.params.id);
  const name = req.body.name;
  const gender = await genderDatamapper.findById(id);

  if (!gender) {
    return res.json({message: "Gender does not exist in DB"})
  }

  const updGender = await genderDatamapper.updateOne(id, name)
  return res.json(updGender)
}

/**
 * Delete one gender from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one gender
 */
async function destroy(req, res) {
  const id = req.params.id;
  const gender = await genderDatamapper.findById(id);

  if (!gender) {
    return res.json({message: "Gender does not exist in DB"})
  }

  await genderDatamapper.deleteOne(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}