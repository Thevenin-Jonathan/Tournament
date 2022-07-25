const typeDatamapper = require("../datamappers/type");

/**
 * Get all types from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all types
 */
 async function getAll(_, res) {
    const types = await typeDatamapper.findAll();
    return res.json(types);
  };

  /**
 * Get one type from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one type
 */
   async function getOne(req, res) {
    const id = req.params.id;
    const type = await typeDatamapper.findById(id);
    return res.json(type);
  };

  /**
 * Add one type into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created type
 */
async function create(req, res) {
    const { name } = req.body;
    const type = await typeDatamapper.findByName(name);
  
    if (type) {
      // throw new Error("Type is already exist in DB");
      return res.json({message: "Type is already exist in DB"})
    }
  
    const newType = await typeDatamapper.insertOne(name);
  
    return res.json(newType);
  };

  /**
 * Update one type into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated type
 */
async function update(req, res) {
    const id = req.params.id;
    const { name } = req.body
    const type = await typeDatamapper.findById(id);
  
    if (!type) {
      return res.json({message: "Type does not exist in DB"})
    }
    if (await typeDatamapper.findByName(name)) {
      // throw new Error("Data is already exist on another type in DB");
      return res.json({message: "Name is already exist on another type in DB"})
    }
    const updType = await typeDatamapper.updateOne(id, name)
    return res.json(updType)
  }

/**
 * Delete one type from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one type
 */
async function destroy(req, res) {
    const id = req.params.id;
    const type = await typeDatamapper.findById(id);
  
    if (!type) {
      return res.json({message: "type does not exist in DB"})
    }
    await typeDatamapper.deleteOne(id);
    return res.status(204).json();
  };

  module.exports = {
    getAll,
    getOne,
    create,
    update,
    destroy
  }