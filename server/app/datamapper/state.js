const pool = require("../config/database");

/** 
 * Get and return all states from DB
 * @returns {Object[]} - the list of all states
*/
async function findAll() {
    const result = await pool.query(
        `SELECT * FROM "state"`
    );
    pool.end();
    return result.rows;
};

/** 
 * Get and return one state based on its id from DB
 * @param {number} - id of the state
 * @returns {Object} - one state
*/
async function findById(id) {
    const result = await pool.query(
        `SELECT * FROM "state" WHERE "id"= $1;`,[id]
    );
    pool.end();
    return result.rows[0];
};

/** 
 * Add a new state to the DB
 * @param {string} - name of state
 * @returns {Object} - state added
*/
async function insertOne(state) {
    const result = await pool.query(
        `INSERT INTO state ("name")
        VALUES($1) 
        RETURNING *;`,[state]
    );  
    pool.end();
    return result.rows[0];
};

/** 
 * Delete one state from DB
 * @param {number} - id of the state
 * @returns {boolean} - true if the state is deleted
*/
async function deleteOne(id) {
    const result = await pool.query(
        `DELETE FROM "state" WHERE "id" = $1;`,[id]
    );
    pool.end();
    return !!result.rowCount;
};

/** 
 * Update the name of one state
 * @param {string} - name of the state
 * @param {number} - id of the state 
 * @returns {Object} - state updated
*/
async function updateOne(name, id) {
    const result = await pool.query(
        `UPDATE "state" 
        SET "name" = $1
        WHERE "id" = $2
        RETURNING *;`,[name, id]
    );
    pool.end();
    return result.rows[0];
  };

  module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne,
    updateOne
  };
