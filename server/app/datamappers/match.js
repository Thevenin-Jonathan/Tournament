const pool = require("../config/database");
const debug = require("debug")("dm-match");

/**
 * Return all matches from database
 * @returns {matches[]} matches
 */
async function findAll() {
  const result = await pool.query(`SELECT * FROM "match"`);
  return result.rows;
}

/**
 * Return one match from database
 * @param {number} id match identifiant
 * @returns {object} match
 */
async function findById(id) {
  const result = await pool.query(`SELECT * FROM "match" WHERE "id" = $1`, [id]);
  return result.rows[0];
}

/**
 * Insert one match in database
 * @param {object} match match informations
 * @returns {object} match
 */
async function insertOne(match) {
  const columns = Object.keys(match).map(key => `"${key}"`);
  const values = Object.values(match);
  const symbols = values.map((_, i) => `$${i + 1}`);

  const result = await pool.query(
    `
      INSERT INTO "match"
        (${columns})
      VALUES
        (${symbols})
      RETURNING *;
    `,      
    [...values]
  )

  return result.rows[0];
}


module.exports = {
  findAll,
  findById,
  insertOne,
}