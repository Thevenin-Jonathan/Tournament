const stateDatamapper = require("../datamappers/state");

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
    const state = await stateDatamapper.findById(id);
    return res.json(state);
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
    const newState = await stateDatamapper.insertOne(name);
    return res.json(newState);
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
      return res.json({message: "State does not exist in DB"})
    }
    const updState = await stateDatamapper.updateOne(id, name)
    return res.json(updState)
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
    const state = await stateDatamapper.findById(id);
  
    if (!state) {
      return res.json({message: "State does not exist in DB"})
    }
    await stateDatamapper.deleteOne(id);
    return res.status(204).json();
  };

  module.exports = {
    getAll,
    getOne,
    create,
    update,
    destroy
  }