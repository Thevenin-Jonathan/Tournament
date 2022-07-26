const genderDatamapper = require("../datamappers/gender");

/**
 * Get and return all genders from DB
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
  const newGender = await genderDatamapper.insertOne(name);
  return res.json(newGender);
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