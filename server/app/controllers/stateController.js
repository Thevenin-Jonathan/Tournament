const stateDatamapper = require("../datamappers/state");
const { ApiError, Api404Error } = require("../services/errorHandler");

/**
 * Get all states from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all states
 */
  async function getAll(_, res) {
    const states = await stateDatamapper.findAll();
    return res.json(states);
  };

  /**
 * Get one state from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one state
 */
  async function getOne(req, res) {
    const id = req.params.id;
    if (id && !isNaN(Number(id))) {
      const state = await stateDatamapper.findById(id);
  
      if (!state) throw new Api404Error("State does not exist in DB");
      return res.json(state);
    } else {
      throw new Api404Error("Invalid id, state not found");
    }
  };

  /**
 * Add one state into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created state
 */
  async function create(req, res) {
    const {name} = req.body;

    /** Verification: name already in use in DB? **/
    if (await stateDatamapper.findByName(name)) {
      throw new ApiError("This name is already in use");
    }

    const newState = await stateDatamapper.insertOne(name);
    return res.status(201).json(newState);
  };

  /**
 * Update one state into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated state
 */
  async function update(req, res) {
    const id = req.params.id;
    const {name} = req.body
    const state = await stateDatamapper.findById(id);
  
    if (!state) {
      throw new Api404Error("State does not exist in DB");
    }

    if (await stateDatamapper.findByName(name)) {
      throw new ApiError("This name is already in use");
    }

    const updatedState = await stateDatamapper.updateOne(id, name)
    return res.json(updatedState)
  }

/**
 * Delete one state from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one state
 */
  async function destroy(req, res) {
    const id = req.params.id;

    if (id && !isNaN(Number(id))) {
      const state = await stateDatamapper.findById(id);
  
      if (!state) {
        throw new Api404Error("State does not exist in DB");
      }
    
      await stateDatamapper.deleteOne(id);
      return res.status(204).json();
    } else {
      throw new Api404Error("Invalid id, state not found");
    }
  };

  module.exports = {
    getAll,
    getOne,
    create,
    update,
    destroy
  }