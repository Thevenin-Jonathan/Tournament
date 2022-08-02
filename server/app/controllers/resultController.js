const resultDatamapper = require("../datamappers/result");
const { ApiError, Api404Error } = require("../services/errorHandler");

/**
 * Get all results from DB
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
  if (id && !isNaN(Number(id))) {
    const result = await resultDatamapper.findById(id);

    if (!result) throw new Api404Error("Result does not exist in DB");
    return res.json(result);
  } else {
    throw new Api404Error("Invalid id, result not found");
  }
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
  const { label } = req.body;

  /** Verification: label already in use in DB? **/
  if (await resultDatamapper.findByLabel(label)) {
    throw new ApiError("This label is already in use");
  }

  const newResult = await resultDatamapper.insertOne(label);
  return res.status(201).json(newResult);
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
    throw new Api404Error("Result does not exist in DB");
  }

  if (await resultDatamapper.findByLabel(label)) {
    throw new ApiError("This label is already in use");
  }

  const updatedResult = await resultDatamapper.updateOne(id, newData)
  return res.json(updatedResult)
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

  if (id && !isNaN(Number(id))) {
    const result = await resultDatamapper.findById(id);

    if (!result) {
      throw new Api404Error("Result does not exist in DB");
    }
  
    await resultDatamapper.deleteOne(id);
    return res.status(204).json();
  } else {
    throw new Api404Error("Invalid id, result not found");
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}