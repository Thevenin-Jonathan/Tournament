const userDatamapper = require("../datamappers/user");

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
  const userData = req.body;
  const user = await userDatamapper.exist(userData);

  if (user) {
    // throw new Error("User is already exist in DB");
    return res.json({message: "User is already exist in DB"})
  }

  const newUser = await userDatamapper.insertOne(userData);

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
    return res.json({message: "User does not exist in DB"})
  }
  
  if (newData.email || newData.phone || newData.player_license) {
    const existingData = await userDatamapper.exist(newData, id);
    if (existingData) {
      // throw new Error("Data is already exist on another user in DB");
      return res.json({message: "Data is already exist on another user in DB"})
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
    return res.json({message: "User does not exist in DB"})
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