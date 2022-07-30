const pool = require("../config/database");
const debug = require("debug")("dm-match");
const matchHasTeamDatamapper = require("./matchHasTeam");

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
    SELECT
    "M"."id",
    "M"."note",
    "M"."tournament_id",
    "M"."state_id",
    (SELECT JSON_AGG(
      JSON_BUILD_OBJECT(
        'team_id', "MT"."team_id",
        'is_winner', "MT"."is_winner",
        'result_id', "MT"."result_id",
        'user', (SELECT JSON_AGG(
                  JSON_BUILD_OBJECT(
                    'user_id', "U"."id"
                  )
                )
                FROM "user" AS "U"
                LEFT JOIN "team_has_user" AS "TU"
                  ON "TU"."user_id" = "U"."id"
                WHERE "TU"."team_id" = "T"."id"
                ))) AS "team"
    FROM "team" AS "T"
    JOIN "match_has_team" AS "MT"
      ON "MT"."team_id" = "T"."id"
    WHERE "MT"."match_id" = "M"."id"
    )
    FROM "match" AS "M"
    WHERE "M"."id" = $1
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

/** 
 * Get and return all the matches of a team
 * @param {number} - id of the team
 * @returns {Object} - all matches
*/
async function findAllTeams(id) {
  const result = await pool.query(
      `SELECT * FROM match_has_team
      WHERE match_id = $1;`,[id]
  );
  return result.rows;
};

module.exports = {
  findAll,
  findById,
  insertOne,
  updateOne,
  deleteOne,
  findAllTeams  
}