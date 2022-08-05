const clubDatamapper = require("../datamappers/club");
const { ApiError, Api404Error } = require("../services/errorHandler");

/**
 * Get all clubs from DB
 * 
 * ExpressMiddleware signature
 * @param {object} _ express request object (not used)
 * @param {object} res express response object
 * @returns {json} JSON response with all clubs
 */
async function getAll(_, res) {
  const clubs = await clubDatamapper.findAll();
  return res.json(clubs);
};

/**
 * Get one club from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one club
 */
async function getOne(req, res) {
  const id = Number(req.params.id);
  if (id && !isNaN(Number(id))) {
    const club = await clubDatamapper.findById(id);

    if (!club) throw new Api404Error("Club does not exist in DB");
    return res.json(club);
  } else {
    throw new Api404Error("Invalid id, club not found");
  }
};

/**
 * Add one club into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the created club
 */
async function create(req, res) {
  const club = req.body;

  /** Verification: club_ref already in use in DB? **/
  if (await clubDatamapper.exist({club_ref: club.club_ref})) {
    throw new ApiError("This club_ref is already in use");
  }

  /** Verification: email already in use in DB? **/
  if (await clubDatamapper.exist({email: club.email})) {
    throw new ApiError("This email is already in use");
  }

  /** Verification: website already in use in DB? **/
  if (await clubDatamapper.exist({website: club.website})) {
    throw new ApiError("This website is already in use");
  }

  const newClub = await clubDatamapper.insertOne(club);
  return res.status(201).json(newClub);
};

/**
 * Update one club into DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with the updated club
 */
async function update(req, res) {
  const id = Number(req.params.id);
  const newData = req.body;
  const club = await clubDatamapper.findById(id);

  if (!club) {
    throw new Api404Error("Club does not exist in DB");
  }

  /** Verification: club_ref already in use in DB? **/
  if (await clubDatamapper.exist({club_ref: newData.club_ref})) {
    throw new ApiError("This club_ref is already in use");
  }
  
  /** Verification: email already in use in DB? **/
  if (await clubDatamapper.exist({email: newData.email})) {
    throw new ApiError("This email is already in use");
  }
  
  /** Verification: website already in use in DB? **/
  if (await clubDatamapper.exist({website: newData.website})) {
    throw new ApiError("This website is already in use");
  }

  const updatedClub = await clubDatamapper.updateOne(id, newData)
  return res.json(updatedClub)
}

/**
 * Delete one club from DB
 * 
 * ExpressMiddleware signature
 * @param {object} req express request object
 * @param {object} res express response object
 * @returns {json} JSON response with one club
 */
async function destroy(req, res) {
  const id = Number(req.params.id);  

  if (id && !isNaN(Number(id))) {
    const club = await clubDatamapper.findById(id);

    if (!club) throw new Api404Error("Club does not exist in DB");  
    await clubDatamapper.deleteOne(id);
    return res.status(204).json();
  } else {
    throw new Api404Error("Invalid id, club not found");
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}