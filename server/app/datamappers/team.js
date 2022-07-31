const pool = require("../config/database");

/** 
 * Get and return all teams
 * @returns {Object[]} - the list of all teams
*/
async function findAll() {
	const result = await pool.query(
		`SELECT * FROM "team" ORDER BY "id" ASC`
	);
	return result.rows;
};

/** 
 * Get and return one team
 * @param {number} id Team id
 * @returns {Object} One team
*/
async function findById(id) {
	const result = await pool.query(
		`
		SELECT
		"T"."id",
		"T"."tournament_id",
		(SELECT JSON_AGG(
			JSON_BUILD_OBJECT(
				'user_id', "TU"."user_id"
			)) AS "users"
		FROM "team_has_user" AS "TU"
		WHERE "TU"."team_id" = "T"."id"),
		COALESCE ((SELECT JSON_AGG(
			JSON_BUILD_OBJECT(
				'match_id', "MT"."match_id",
				'is_winner', "MT"."is_winner",
				'result_id', "MT"."result_id"
			))
		FROM "match_has_team" AS "MT"
		WHERE "MT"."team_id" = "T"."id"), '[]') AS "matches"  
		FROM "team" AS "T"
		WHERE "id"= $1;
		`,[id]
	);
	return result.rows;
};

/** 
 * Add a new team to a tournament
 * @param {number} tournament_id Tournament id
 * @returns {Object} New team
*/
async function insertOne(tournament_id) {
	const result = await pool.query(
		`
		INSERT INTO "team" ("tournament_id")
		VALUES ($1) 
		RETURNING *;
		`,[tournament_id]
	);  
	return result.rows[0];
};

/** 
 * Add one user into team
 * @param {number} id Team id
 * @param {number} userId User id to add
 * @returns {Object} - New team
*/
async function insertUser(id, userId) {
	const result = await pool.query(
		`
		INSERT INTO "team_has_user" ("team_id", "user_id")
		VALUES ($1, $2) 
		RETURNING *;
		`,[id, userId]
	);  
	return result.rows[0];
};

/** 
 * Update team tournament id
 * @param {number} id Team id
 * @param {number} tournamentId Tournament id
 * @returns {Object} - Team updated
*/
async function updateOne(id, tournamentId) {
	const result = await pool.query(
		`
		UPDATE "team" 
		SET "tournament_id" = $1
		WHERE "id" = $2
		RETURNING *;
		`,[tournamentId, id]
	);
	return result.rows[0];
};

/** 
 * Delete one team
 * @param {number} id Team id
 * @returns {boolean} True if the team is deleted
*/
async function deleteOne(id) {
	const result = await pool.query(
		`DELETE FROM "team" WHERE "id" = $1;`,[id]
	);
	return !!result.rowCount;
};

module.exports = {
	findAll,
	findById,
	insertOne,
	insertUser,
	updateOne,
	deleteOne
};