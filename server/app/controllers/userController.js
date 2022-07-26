const bcrypt = require("bcrypt");
const debug = require("debug")("login");
const userDatamapper = require("../datamappers/user");
const { ApiError, Api404Error } = require("../services/errorHandler");

/**
 * Get all users from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all users
 */
async function getAll(_, res) {
  const users = await userDatamapper.findAll();
  return res.json(users);
};

/**
 * Get one user from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one user
 */
async function getOne(req, res) {
  const id = req.params.id;
  const user = await userDatamapper.findById(id);
  return res.json(user);
};

/**
 * Add one user into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created user
 */
async function create(req, res) {
  const user = req.body;

  /** Verification: email already in use in DB? **/
  if (await userDatamapper.exist({email: user.email})) {
    throw new ApiError("This email is already in use");
  }

  /** Verification: phone already in use in DB? **/
  if (await userDatamapper.exist({phone: user.phone})) {
    throw new ApiError("This phone number is already in use");
  }

  /** Verification: player license already in use in DB? **/
  if (await userDatamapper.exist({player_license: user.player_license})) {
    throw new ApiError("This player license is already in use");
  }

  /** Password hash **/
  const saltRound = 10;
  user.password = await bcrypt.hash(user.password, saltRound);

  const newUser = await userDatamapper.insertOne(user);
  return res.json(newUser);
};

/**
 * Update one user into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated user
 */
async function update(req, res) {
  const id = req.params.id;
  const newData = req.body;
  const user = await userDatamapper.findById(id);

  if (!user) {
    throw new Api404Error("User does not exist in DB");
  }
  
  if (newData.email || newData.phone || newData.player_license) {
    const existingData = await userDatamapper.exist(newData, id);
    if (existingData) {
      throw new ApiError("Data is already exist on another user in DB");
    }
  }

  const updUser = await userDatamapper.updateOne(id, newData)
  return res.json(updUser)
}

/**
 * Delete one user from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one user
 */
async function destroy(req, res) {
  const id = req.params.id;
  const user = await userDatamapper.findById(id);

  if (!user) {
    throw new ApiError("User does not exist in DB");
  }

  await userDatamapper.deleteOne(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}