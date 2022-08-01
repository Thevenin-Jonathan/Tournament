const disciplineDatamapper = require("../datamappers/discipline");
const { ApiError, Api404Error } = require("../services/errorHandler");

/**
 * Get all disciplines from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all disciplines
 */
 async function getAll(_, res) {
    const disciplines = await disciplineDatamapper.findAll();
    return res.json(disciplines);
  };

  /**
 * Get one discipline from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one discipline
 */
   async function getOne(req, res) {
    const id = req.params.id;
    if (id && !isNaN(Number(id))) {
      const discipline = await disciplineDatamapper.findById(id);
  
      if (!discipline) throw new Api404Error("Discipline does not exist in DB");
      return res.json(discipline);
    } else {
      throw new Api404Error("Invalid id, discipline not found");
    }
  };

  /**
 * Add one discipline into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created discipline
 */
async function create(req, res) {
    const { name } = req.body;
  
    /** Verification: Name already in use in DB? **/
    if (await disciplineDatamapper.findByName(name)) {
      throw new ApiError("This label is already in use");
    }
  
    const newDiscipline = await disciplineDatamapper.insertOne(name);
  
    return res.json(newDiscipline);
  };

  /**
 * Update one discipline into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated discipline
 */
async function update(req, res) {
    const id = req.params.id;
    const { name } = req.body
    const discipline = await disciplineDatamapper.findById(id);
  
    if (!discipline) {
      throw new Api404Error("Discipline does not exist in DB");
    }

    /** Verification: name already in use in DB? **/
    if (await disciplineDatamapper.findByName(name)) {
      throw new ApiError("This name is already in use");
    }

    const updatedDiscipline = await disciplineDatamapper.updateOne(id, name)
    return res.json(updatedDiscipline)
  }

/**
 * Delete one discipline from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one discipline
 */
async function destroy(req, res) {
  const id = req.params.id;
  
  if (id && !isNaN(Number(id))) {
    const discipline = await disciplineDatamapper.findById(id);

    if (!discipline) {
      throw new Api404Error("Discipline does not exist in DB");
    }
  
    await disciplineDatamapper.deleteOne(id);
    return res.status(204).json();
  } else {
    throw new Api404Error("Invalid id, discipline not found");
  }
};

  module.exports = {
    getAll,
    getOne,
    create,
    update,
    destroy
  }