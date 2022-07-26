const roleDatamapper = require("../datamappers/role");

/**
 * Get all roles from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all roles
 */
 async function getAll(_, res) {
    const roles = await roleDatamapper.findAll();
    return res.json(roles);
  };

  /**
 * Get one role from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one role
 */
   async function getOne(req, res) {
    const id = req.params.id;
    const role = await roleDatamapper.findById(id);
    return res.json(role);
  };

  /**
 * Add one role into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created role
 */
async function create(req, res) {
    const { name } = req.body;
    const role = await roleDatamapper.findByName(name);
  
    if (role) {
      // throw new Error("Role is already exist in DB");
      return res.json({message: "Role is already exist in DB"})
    }
  
    const newRole = await roleDatamapper.insertOne(name);
  
    return res.json(newRole);
  };

  /**
 * Update one role into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated role
 */
async function update(req, res) {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const role = await roleDatamapper.findById(id);
  
    if (!role) {
      return res.json({message: "Role does not exist in DB"})
    }
    if (await roleDatamapper.findByName(name)) {
        // throw new Error("Data is already exist on another role in DB");
        return res.json({message: "Data is already exist on another role in DB"})
      }
    const updRole = await roleDatamapper.updateOne(id, name)
    return res.json(updRole)
  }

  /**
 * Delete one role from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one role
 */
async function destroy(req, res) {
    const id = parseInt(req.params.id);
    const role = await roleDatamapper.findById(id);
  
    if (!role) {
      return res.json({message: "Role does not exist in DB"})
    }
  
    await roleDatamapper.deleteOne(id);
    return res.status(204).json();
  };

  module.exports = {
    getAll,
    getOne,
    create,
    update,
    destroy
  }