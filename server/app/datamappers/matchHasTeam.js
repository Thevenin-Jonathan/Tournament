const pool = require("../config/database");
const debug = require("debug")("dm-match-has-team")

/**
 * Return all relations and informations between matches and teams from database
 * @returns {data[]} matches and teams data
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

/**
 * Return all relations and informations between one match and his teams from database
 * @param {number} matchId match identifiant
 * @returns {data[]} match and his teams data
 */
async function findByMatchId(matchId) {
  const result = await pool.query(
    `
      SELECT * FROM "match_has_team"
      WHERE "match_id" = $1;
    `,
    [matchId]);
  return result.rows;
}

/**
 * Return all relations and informations between one team and his matches from database
 * @param {number} teamId team identifiant
 * @returns {data[]} team and his matches data
 */
async function findByTeamId(teamId) {
  const result = await pool.query(
    `
      SELECT * FROM "match_has_team"
      WHERE "team_id" = $1;
    `,
    [teamId]);
  return result.rows;
}

/**
 * Insert all relations and informations between one match and one team from database
 * @param {object} data match and team informations 
 * @returns {object} match and team data created
 */
async function insertOne(data) {
  const columns = Object.keys(data).map(key => `"${key}"`);
  const values = Object.values(data);
  const symbols = values.map((_, i) => `$${i + 1}`);

  debug(`
  INSERT INTO "match_has_team"
    (${columns})
  VALUES
    (${symbols})
  RETURNING *;
`)

  const result = await pool.query(
    `
      INSERT INTO "match_has_team"
        (${columns})
      VALUES
        (${symbols})
      RETURNING *;
    `,      
    [...values]
  )

  return result.rows[0];
}

/**
 * Update informations between one match and one team from database
 * @param {object} data match and team informations
 * @returns {object} match and team data updated
 */
async function updateOne(matchId, teamId, data) {
  const columns = Object.keys(data).map((key, i) => `"${key}" = $${i + 1}`);
  const values = Object.values(data);
  const result = await pool.query(
    `
      UPDATE "match_has_team" SET
        ${columns}
      WHERE
         "match_id" = $${columns.length + 1}
      AND
         "team_id" = $${columns.length + 2}
      RETURNING *;
    `,
    [...values, matchId, teamId]
  );

  return result.rows[0];
}

module.exports = {
  findAll,
  findByMatchIdAndTeamId,
  findByMatchId,
  findByTeamId,
  insertOne,
  updateOne
}