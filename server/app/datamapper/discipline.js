const pool = require("../config/database");

/** 
 * Get and return all disciplines from DB
 * @returns {Object[]} - the list of all disciplines
*/
async function findAll() {
    const result = await pool.query(
        `SELECT * FROM "discipline"`
    );
    pool.end();
    return result.rows;
};

/** 
 * Get and return one discipline based on its id from DB
 * @param {number} - id of the discipline
 * @returns {Object} - one discipline
*/
async function findById(id) {
    const result = await pool.query(
        `SELECT * FROM "discipline" WHERE "id"= $1;`,[id]
    );
    pool.end();
    return result.rows[0];
};

/** 
 * Add a new discipline to the DB
 * @param {string} - name of discipline
 * @returns {Object} - discipline added
*/
async function insertOne(discipline) {
    const result = await pool.query(
        `INSERT INTO discipline ("name")
        VALUES($1) 
        RETURNING *;`,[discipline]
    );  
    pool.end();
    return result.rows[0];
};

/** 
 * Delete one discipline from DB
 * @param {number} - id of the discipline
 * @returns {boolean} - true if the discipline is deleted
*/
async function deleteOne(id) {
    const result = await pool.query(
        `DELETE FROM "discipline" WHERE "id" = $1;`,[id]
    );
    pool.end();
    return !!result.rowCount;
};

/** 
 * Update the name of one discipline
 * @param {string} - name of the discipline
 * @param {number} - id of the discipline 
 * @returns {Object} - discipline updated
*/
async function updateOne(name, id) {
    const result = await pool.query(
        `UPDATE "discipline" 
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
  }
