const clubDatamapper = require("../datamappers/club");

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
  const id = req.params.id;
  const club = await clubDatamapper.findById(id);
  return res.json(club);
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
    return res.json({message: "This club_ref is already in use"})
  }

  /** Verification: email already in use in DB? **/
  if (await clubDatamapper.exist({email: club.email})) {
    return res.json({message: "This email is already in use"})
  }

  /** Verification: website already in use in DB? **/
  if (await clubDatamapper.exist({website: club.website})) {
    return res.json({message: "This website is already in use"})
  }

  const newClub = await clubDatamapper.insertOne(club);
  return res.json(newClub);
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
  const id = req.params.id;
  const newData = req.body;
  const club = await clubDatamapper.findById(id);

  if (!club) {
    return res.json({message: "Club does not exist in DB"})
  }
  
  if (newData.email || newData.phone || newData.player_license) {
    const existingData = await clubDatamapper.exist(newData, id);
    if (existingData) {
      // throw new Error("Data is already exist on another club in DB");
      return res.json({message: "Data is already exist on another club in DB"})
    }
  }

  const updClub = await clubDatamapper.updateOne(id, newData)
  return res.json(updClub)
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
  const id = req.params.id;
  const club = await clubDatamapper.findById(id);

  if (!club) {
    return res.json({message: "Club does not exist in DB"})
  }

  await clubDatamapper.deleteOne(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}