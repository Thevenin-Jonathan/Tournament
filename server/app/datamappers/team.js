const pool = require("../config/database");

/** 
 * Get and return all teams that participate to a tournament from DB
 * @returns {Object[]} - the list of all teams
*/
async function findAll() {
    const result = await pool.query(
        `SELECT * FROM "team"`
    );
    return result.rows;
};

/** 
 * Get and return one team that participate to a tournament based on its id from DB
 * @param {number} - id of the team
 * @returns {Object} - one team
*/
async function findById(id) {
    const result = await pool.query(
        `SELECT * FROM "team" WHERE "id"= $1;`,[id]
    );
    return result.rows;
};

/** 
 * Add a new team to a tournament in the DB
 * @param {number} - id of the team
 * @returns {Object} - team added
*/
async function insertOne(tournament_id) {
    const result = await pool.query(
        `INSERT INTO team ("tournament_id")
        VALUES($1) 
        RETURNING *;`,[tournament_id]
    );  
    return result.rows[0];
};

/** 
 * Delete one team from a tournament in the DB
 * @param {number} - id of the team
 * @returns {boolean} - true if the team is deleted
*/
async function deleteOne(id) {
    const result = await pool.query(
        `DELETE FROM "team" WHERE "id" = $1;`,[id]
    );
    return !!result.rowCount;
};

/** 
 * Update the tournament of one team
 * @param {number} - id of the tournament
 * @param {number} - id of the team 
 * @returns {Object} - team updated
*/
async function updateOne(tournamentId, id) {
    const result = await pool.query(
        `UPDATE "team" 
        SET "tournament_id" = $1
        WHERE "id" = $2
        RETURNING *;`,[tournamentId, id]
    );
    return result.rows[0];
  };

/** 
 * Get and return all the matches of a team
 * @param {number} - id of the team
 * @returns {Object} - all matches
*/
async function findAllMatches(id) {
    const result = await pool.query(
        `SELECT * FROM match_has_team
        WHERE team_id = $1;`,[id]
    );
    return result.rows;
};

  module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne,
    updateOne,
    findAllMatches
  };

