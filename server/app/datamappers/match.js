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
  const result = (await pool.query(
    `
    SELECT
      "match"."id", "match_has_team"."team_id", "state_id",
      "note", "match"."tournament_id", "is_winner", "result_id",
      ARRAY_AGG("team_has_user"."user_id") AS "user_id"
    FROM "match"
    LEFT JOIN "match_has_team"
      ON "match_has_team"."match_id" = "match"."id"
    LEFT JOIN "team"
      ON "match_has_team"."team_id" = "team"."id"
    LEFT JOIN "team_has_user"
      ON "team_has_user"."team_id" = "team"."id"
    LEFT JOIN "result"
      ON "result"."id" = "result_id"
    LEFT JOIN "state"
      ON "state"."id" = "state_id"
    WHERE "match"."id" = $1
    GROUP BY 1, 2, 3, 4, 5, 6, 7
    `,
    [id])).rows;
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
    ("tournament_id")
    VALUES
    ($1)
    RETURNING *
    `, [match.tournament_id]
    )).rows[0];
    
  result.team = [];

  for (const team of match.team) {
    const newTeam = await pool.query (
      `
      INSERT INTO "match_has_team"
        ("match_id", "team_id")
      VALUES
        ($1, $2)
      RETURNING "team_id" AS "id", "is_winner", "result_id";
      `, [result.id, team.id]
    );
    result.team.push(newTeam.rows[0]);
  };
  
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
 * Delete one match from database
 * @param {number} id match identifiant
 * @returns {boolean} true if match was delete
 */
async function deleteOne(id) {
  const result = await pool.query(
    `
      DELETE FROM "match" WHERE id = $1
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
  deleteOne
}