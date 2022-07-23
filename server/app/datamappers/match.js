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


module.exports = {
  findAll,
}