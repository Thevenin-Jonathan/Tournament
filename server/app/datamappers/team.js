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
		SELECT * FROM "get_team_by_id"($1);
		`,[id]
	);
	return result.rows[0];
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
 * Remove one user from team
 * @param {number} id Team id
 * @param {number} userId User id to remove
 * @returns {Object} - True if user was delete
*/
async function deleteUser(id, userId) {
	const result = await pool.query(
		`
		DELETE FROM "team_has_user"
		WHERE "user_id" = $2
		AND "team_id" = $1;
		`,[id, userId]
	);  
	return result.rowCount;
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
	deleteUser,
	deleteOne
};