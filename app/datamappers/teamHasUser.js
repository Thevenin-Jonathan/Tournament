const pool = require("../config/database");

/** 
 * Get and return all the teams and the users that are part of a team
 * @returns {Object[]} - the list of all the teams and the users that are part of a team
*/
async function findAll() {
    const result = await pool.query(
        `SELECT * FROM "team_has_user"`
    );
    return result.rows;
};

/** 
 * Get and return all the users that belong to a team
 * @param {number} - id of the team
 * @returns {Object} - id of the users that belong to the team(ID)
*/
async function findByTeamId(id) {
    const result = await pool.query(
        `SELECT * FROM "team_has_user" 
        WHERE "team_id"= $1;`,[id]
    );
    return result.rows;
};

/** 
 * Get and return the users that belong to a team based on both IDs
 * @param {number} - id of the team
 * @param {number} - id of the user
 * @returns {Object} - id of the user that belong to the team and ID of the team
*/
async function findByTeamIdAndUserId(teamId, userId) {
    const result = await pool.query(
        `SELECT * FROM "team_has_user" 
        WHERE "team_id"= $1
        AND "user_id"= $2;`,
        [teamId, userId]
    );
    return result.rows[0];
};

/** 
 * Add a new user to a team in the DB
 * @param {number} - id of the team
 * @param {number} - id of the user
 * @returns {Object} - user added to one teal
*/
async function insertOne(team_id, user_id) {
    const result = await pool.query(
        `INSERT INTO "team_has_user" ("team_id", "user_id")
        VALUES($1, $2) 
        RETURNING *;`,[team_id, user_id]
    );  
    return result.rows[0];
};

/** 
 * Delete one user from one team from the DB
 * @param {number} - id of the team
 * @param {number} - id of the user
 * @returns {boolean} - true if the team is deleted
*/
async function deleteOne(team_id, user_id) {
    const result = await pool.query(
        `DELETE FROM "team_has_user" 
        WHERE "team_id" = $1 
        AND "user_id" = $2;`,
        [team_id, user_id]
    );
    return !!result.rowCount;
};

/** 
 * Update the team wich one user is part of
 * @param {number} - id of the team
 * @param {number} - id of the user 
 * @returns {Object} - team updated
*/
async function updateOne(teamId, userId) {
    const result = await pool.query(
        `UPDATE "team_has_user" 
        SET "team_id" = $1
        WHERE "user_id" = $2
        RETURNING *;`,[teamId, userId]
    );
    return result.rows[0];
  };

  module.exports = {
    findAll,
    findByTeamId,
    findByTeamIdAndUserId,
    insertOne,
    deleteOne,
    updateOne
  };