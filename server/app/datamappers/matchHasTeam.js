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

/**
 * Return all relations and informations between one match and one team from database
 * @param {number} matchId match identifiant
 * @param {number} teamId team identifiant
 * @returns {object} match and his team data
 */
async function findByMatchIdAndTeamId(matchId, teamId) {
  const result = await pool.query(
    `
      SELECT * FROM "match_has_team"
      WHERE "match_id" = $1
        AND team_id = $2;
    `,
    [matchId, teamId]);
  return result.rows[0];
}


module.exports = {
  findAll,
}