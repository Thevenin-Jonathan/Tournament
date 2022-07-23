const pool = require("../config/database");

/**
 * Return all tournaments from database
 * @returns {tournaments[]} tournaments
 */
async function findAll() {
  const result = await pool.query(`SELECT * FROM "tournament"`);
  return result.rows;
}


module.exports = {
  findAll,
}