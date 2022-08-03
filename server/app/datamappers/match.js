const pool = require("../config/database");
const debug = require("debug")("dm-match");

/**
 * Return all matches from database
 * @returns {matches[]} matches
 */
async function findAll() {
  const result = await pool.query(`SELECT * FROM "match" ORDER BY "id" ASC`);
  return result.rows;
}

/**
 * Return one match from database
 * @param {number} id match identifiant
 * @returns {object} match
 */
async function findById(id) {
  const result = (await pool.query(
    `
    SELECT * 
    FROM "get_match" AS "GM"
    WHERE "GM"."id" = $1;
    `,
    [id])).rows[0];
  return result;
}

/**
 * Insert one match in database
 * @param {object} match match informations
 * @returns {object} match
 */
async function insertOne(match) {
  let result = (await pool.query (
    `
    INSERT INTO "match"
    ("tournament_id", "phase")
    VALUES
    ($1, $2)
    RETURNING *
    `, [match.tournament_id, match.phase]
    )).rows[0];
      
  return result;
}

/**
 * Update one match in database
 * @param {number} id match identifiant
 * @param {object} match match informations
 * @returns {object} match
 */
async function updateOne(id, match) {
  const columns = Object.keys(match).map((key, i) => `"${key}" = $${i + 1}`);
  const values = Object.values(match);
  const result = await pool.query(
    `
      UPDATE "match" SET
        ${columns}
      WHERE
        id = $${columns.length + 1}
      RETURNING *;
    `,
    [...values, id]
  );

  return result.rows[0];
}

/**
 * Set team score
 * @param {number} matchId match identifiant
 * @param {number} teamId team identifiant
 * @param {number} resultId result identifiant
 * @param {boolean} isWinner is team winner
 * @returns {object} infos match
 */
 async function setScore(matchId, teamId, resultId, isWinner) {
  const result = await pool.query(
    `    
    UPDATE "match_has_team" SET
      "result_id" = $3,
      "is_winner" = $4
    WHERE "match_id" = $1
      AND "team_id" = $2
    RETURNING *;
    `,
    [matchId, teamId, resultId, isWinner]
  );

  return result.rows[0];
} 

/**
 * Add one team into match
 * @param {number} id match identifiant
 * @param {object} team_id match informations
 * @returns {object} infos match
 */
 async function insertTeam(id, teamId) {
  const result = await pool.query(
    `    
    INSERT INTO "match_has_team"
      (match_id, "team_id")
    VALUES
      ($1, $2)
    RETURNING *;
    `,
    [id, teamId]
  );

  return result.rows[0];
} 

/**
 * Remove one team from match
 * @param {number} id match identifiant
 * @param {object} team_id team id
 * @returns {object} true if team was delete
 */
 async function deleteTeam(id, teamId) {
  const result = await pool.query(
    `    
    DELETE FROM "match_has_team"
    WHERE "team_id" = $2
      AND "match_id" = $1
    `,
    [id, teamId]
  );

  return result.rowCount;
} 

/**
 * Delete one match from database
 * @param {number} id match identifiant
 * @returns {boolean} true if match was delete
 */
async function deleteOne(id) {
  const result = await pool.query(
    `
    DELETE FROM "match" WHERE "id" = $1;
    `,
    [id]
  );

  return !!result.rowCount;
}

module.exports = {
  findAll,
  findById,
  insertOne,
  updateOne,
  setScore,
  insertTeam,
  deleteTeam,
  deleteOne 
}