const pool = require("../config/database");

/** 
 * Get and return all users that can handle tournaments
 * @returns {Object[]} - the list of all users that can handle tournaments
*/
async function findAll() {
    const result = await pool.query(
        `SELECT * FROM "tournament_has_user"`
    );
    return result.rows;
};

/** 
 * Get and return one tournament based on its id from DB and the id of the user handeling it
 * @param {number} - id of the tournament
 * @returns {Object} - one tournament
*/
async function findById(id) {
    const result = await pool.query(
        `SELECT * FROM "tournament_has_user" WHERE "tournament_id"= $1;`,[id]
    );
    return result.rows[0];
};

/** 
 * Add a new user to handle a tournament in the DB
 * @param {number} - id of the tournament
 * @param {number} - id of the user
 * @returns {Object} - tournament added
*/
async function insertOne(tournament_id, user_id) {
    const result = await pool.query(
        `INSERT INTO "tournament_has_user" ("tournament_id", "user_id")
        VALUES($1, $2) 
        RETURNING *;`,[tournament_id, user_id]
    );  
    return result.rows[0];
};

/** 
 * Delete one user from handeling a tournament from the DB
 * @param {number} - id of the tournament
 * @param {number} - id of the user
 * @returns {boolean} - true if the tournament is deleted
*/
async function deleteOne(tournament_id, user_id) {
    const result = await pool.query(
        `DELETE FROM "tournament_has_user" WHERE "tournament_id" = $1 AND "user_id" = $2;`,
        [tournament_id, user_id]
    );
    return !!result.rowCount;
};

/** 
 * Update the user that handle one tournament
 * @param {number} - id of the tournament
 * @param {number} - id of the user 
 * @returns {Object} - tournament updated
*/
async function updateOne(userId, tournamentId) {
    const result = await pool.query(
        `UPDATE "tournament_has_user" 
        SET "user_id" = $1
        WHERE "tournament_id" = $2
        RETURNING *;`,[userId, tournamentId]
    );
    return result.rows[0];
  };

  module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne,
    updateOne
  };
