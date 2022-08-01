const typeDatamapper = require("../datamappers/type");
const { ApiError, Api404Error } = require("../services/errorHandler");

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
    if (id && !isNaN(Number(id))) {
      const type = await typeDatamapper.findById(id);
  
      if (!type) throw new Api404Error("Type does not exist in DB");
      return res.json(type);
    } else {
      throw new Api404Error("Invalid id, type not found");
    }
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
      throw new ApiError("This type is already in use");
    }
  
    const newType = await typeDatamapper.insertOne(name);  
    return res.status(201).json(newType);
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
      throw new Api404Error("Type does not exist in DB");
    }

    if (await typeDatamapper.findByName(name)) {
      throw new ApiError("This name is already in use");
    }

    const updatedType = await typeDatamapper.updateOne(id, name)
    return res.json(updatedType)
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
    
    if (id && !isNaN(Number(id))) {
      const type = await typeDatamapper.findById(id);
  
      if (!type) {
        throw new Api404Error("Type does not exist in DB");
      }
    
      await typeDatamapper.deleteOne(id);
      return res.status(204).json();
    } else {
      throw new Api404Error("Invalid id, type not found");
    }
  };

  module.exports = {
    getAll,
    getOne,
    create,
    update,
    destroy
  }