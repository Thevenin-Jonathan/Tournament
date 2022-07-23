const pool = require("../config/database");

/**
 * Return all tournaments from database
 * @returns {tournaments[]} tournaments
 */
async function findAll() {
  const result = await pool.query(`SELECT * FROM "tournament"`);
  return result.rows;
}

/**
 * Return one tournament from database
 * @param {number} id tournament identifiant
 * @returns {object} tournament
 */
async function findById(id) {
  const result = await pool.query(`SELECT * FROM "tournament" WHERE "id" = $1`, [id]);
  return result.rows[0];
}


module.exports = {
  findAll,
}