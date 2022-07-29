const pool = require("../config/database");
const debug = require("debug")("dm-tournament")

/**
 * Return all tournaments from database
 * @returns {tournaments[]} tournaments
 */
async function findAll() {
  const result = await pool.query(`SELECT * FROM "tournament"`);
  return result.rows;
};

/**
 * Return one tournament from database
 * @param {number} id tournament identifiant
 * @returns {object} tournament
 */
async function findById(id) {
  const result = await pool.query(`SELECT * FROM "tournament" WHERE "id" = $1`, [id]);
  return result.rows[0];
};

/**
 * Insert one tournament in database
 * @param {object} tournament tournament informations
 * @returns {object} tournament
 */
async function insertOne(tournament) {
  const columns = Object.keys(tournament).map(key => `"${key}"`);
  const values = Object.values(tournament);
  const symbols = values.map((_, i) => `$${i + 1}`);

  const result = await pool.query(
    `
      INSERT INTO "tournament"
        (${columns})
      VALUES
        (${symbols})
      RETURNING *;
    `,      
    [...values]
  )

  return result.rows[0];
};

/**
 * Update one tournament in database
 * @param {number} id tournament identifiant
 * @param {object} tournament tournament informations
 * @returns {object} tournament
 */
async function updateOne(id, tournament) {
  const columns = Object.keys(tournament).map((key, i) => `"${key}" = $${i + 1}`);
  const values = Object.values(tournament);
  const result = await pool.query(
    `
      UPDATE "tournament" SET
        ${columns}
      WHERE
        id = $${columns.length + 1}
      RETURNING *;
    `,
    [...values, id]
  );

  return result.rows[0];
};

/**
 * Delete one tournament from database
 * @param {number} id tournament identifiant
 * @returns {boolean} true if tournament was delete
 */
async function deleteOne(id) {
  const result = await pool.query(
    `
      DELETE FROM "tournament" WHERE id = $1
    `,
    [id]
  );

  return !!result.rowCount;
};

/**
 * Return all matches by tournament_id from database
 * @param {number} id match identifiant
 * @returns {object} match
 */
 async function findAllMatches(id) {
  const result = await pool.query(`SELECT * FROM "match" WHERE "tournament_id" = $1`, [id]);
  return result.rows;
};

//recuperer toutes les teams d'un tournoi
/**
 * Return all teams of a tournament
 * @param {number} id tournament identifiant
 * @returns {object} teams
 */
 async function findAllTeams(id) {
  const result = await pool.query(`SELECT * FROM "team" WHERE tournament_id = $1
  `, [id]);
  return result.rows;
};


module.exports = {
  findAll,
  findById,
  insertOne,
  updateOne,
  deleteOne,
  findAllMatches,
  findAllTeams
  };