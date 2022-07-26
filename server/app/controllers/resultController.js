const resultDatamapper = require("../datamappers/result");

/**
 * Get and return all results from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all results
 */
async function getAll(_, res) {
  const result = await resultDatamapper.findAll();
  return res.json(result);
};

/**
 * Get one result from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one result
 */
async function getOne(req, res) {
  const id = req.params.id;
  const result = await resultDatamapper.findById(id);
  return res.json(result);
};

/**
 * Add one result into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created result
 */
async function create(req, res) {
  const result = req.body.label;
  const newResult = await resultDatamapper.insertOne(result);
  return res.json(newResult);
};

/**
 * Update one result into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated result
 */
async function update(req, res) {
  const id = req.params.id;
  const newData = req.body.label;
  const result = await resultDatamapper.findById(id);

  if (!result) {
    return res.json({message: "Result does not exist in DB"})
  }

  const updResult = await resultDatamapper.updateOne(id, newData)
  return res.json(updResult)
}

/**
 * Delete one result from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one result
 */
async function destroy(req, res) {
  const id = req.params.id;
  const result = await resultDatamapper.findById(id);

  if (!result) {
    return res.json({message: "Result does not exist in DB"})
  }

  await resultDatamapper.deleteOne(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}