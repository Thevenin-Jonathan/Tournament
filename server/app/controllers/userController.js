const debug = require("debug")("login");
const bcrypt = require("bcrypt");
const userDatamapper = require("../datamappers/user");
const { sendEmail } = require("../services/mailHandler");
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
  delete users.password;
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
  delete user.password;
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

  /** Save password for email mw */
  const { password } = user; //jonjon

  /** Password hash **/
  const saltRound = 10;
  user.password = await bcrypt.hash(user.password, saltRound);

  /** Save new user in DB */
  const newUser = await userDatamapper.insertOne(user);

  /** Send email with user infos */
  newUser.password = password;
  const infos = await sendEmail(
    newUser,
    "Validation de l'inscription",
    "signup"
  );

  /** Delete password from newUser */
  delete newUser.password;

  return res.status(201).json({ user: newUser, infos });
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

  /** Verification: email already in use in DB? **/
  if (await userDatamapper.exist({email: newData.email})) {
    throw new ApiError("This email is already in use");
  }

  /** Verification: phone already in use in DB? **/
  if (await userDatamapper.exist({phone: newData.phone})) {
    throw new ApiError("This phone number is already in use");
  }

  /** Verification: player license already in use in DB? **/
  if (await userDatamapper.exist({player_license: newData.player_license})) {
    throw new ApiError("This player license is already in use");
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