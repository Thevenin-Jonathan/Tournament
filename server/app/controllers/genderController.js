const genderDatamapper = require("../datamappers/gender");
const { ApiError, Api404Error } = require("../services/errorHandler");

/**
 * Get all genders from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all genders
 */
async function getAll(_, res) {
  const genders = await genderDatamapper.findAll();
  return res.json(genders);
};

/**
 * Get one gender from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one gender
 */
async function getOne(req, res) {
  const id = req.params.id;
  const gender = await genderDatamapper.findById(id);
  return res.json(gender);
};

/**
 * Add one gender into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created gender
 */
async function create(req, res) {
  const name = req.body.name;

  /** Verification: name already in use in DB? **/
  if (await genderDatamapper.findByName(name)) {
    throw new ApiError("This name is already in use");
  }

  const newGender = await genderDatamapper.insertOne(name);
  return res.status(201).json(newGender);
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
    throw new Api404Error("Gender does not exist in DB");
  }

  const updatedGender = await genderDatamapper.updateOne(id, name)
  return res.json(updatedGender)
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
    throw new Api404Error("Gender does not exist in DB");
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