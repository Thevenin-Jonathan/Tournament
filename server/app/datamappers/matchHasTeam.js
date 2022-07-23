const pool = require("../config/database");
const debug = require("debug")("dm-match-has-team")

/**
 * Return all relations and informations between matches and teams from database
 * @returns {data[]} matchs and teams data
 */
async function findAll() {
  const result = await pool.query(`SELECT * FROM "match_has_team"`);
  return result.rows;
}


module.exports = {
  findAll,
}