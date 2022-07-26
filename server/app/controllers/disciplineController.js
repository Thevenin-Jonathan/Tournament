const disciplineDatamapper = require("../datamappers/discipline");

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
    const discipline = await disciplineDatamapper.findById(id);
    return res.json(discipline);
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
    const discipline = await disciplineDatamapper.findByName(name);
  
    if (discipline) {
      // throw new Error("Discipline is already exist in DB");
      return res.json({message: "Discipline is already exist in DB"})
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
      return res.json({message: "Discipline does not exist in DB"})
    }
    if (await disciplineDatamapper.findByName(name)) {
      // throw new Error("Data is already exist on another discipline in DB");
      return res.json({message: "Name is already exist on another discipline in DB"})
    }
    const updDiscipline = await disciplineDatamapper.updateOne(id, name)
    return res.json(updDiscipline)
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
    const discipline = await disciplineDatamapper.findById(id);
  
    if (!discipline) {
      return res.json({message: "discipline does not exist in DB"})
    }
    await disciplineDatamapper.deleteOne(id);
    return res.status(204).json();
  };

  module.exports = {
    getAll,
    getOne,
    create,
    update,
    destroy
  }