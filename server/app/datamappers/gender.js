const pool = require("../config/database");

/** 
 * Get and return all genders from DB
 * @returns {Object[]} - the list of all genders
*/
async function findAll() {
    const result = await pool.query(`SELECT * FROM "gender" ORDER BY "id" ASC`);
    return result.rows;
};

/** 
 * Get and return one gender based on its id from DB
 * @param {number} - id of the gender
 * @returns {Object} - one gender
*/
async function findById(id) {
    const result = await pool.query(
        `SELECT * FROM "gender" WHERE "id"= $1;`,[id]
    );
    return result.rows[0];
};

/**
 * Get one gender from database
 * @param {string} name gender name
 * @returns {object} name
 */
 async function findByName(name) {
    const result = await pool.query(`SELECT * FROM "gender" WHERE "name" = $1`, [name]);
    return result.rows[0];
}

/** 
 * Add a new gender to the DB
 * @param {string} - name of gender
 * @returns {Object} - gender added
*/
async function insertOne(gender) {
    const result = await pool.query(
        `INSERT INTO gender ("name")
        VALUES($1) 
        RETURNING *;`,[gender]
    );  
    return result.rows[0];
};

/** 
 * Delete one gender from DB
 * @param {number} - id of the gender
 * @returns {boolean} - true if the gender is deleted
*/
async function deleteOne(id) {
    const result = await pool.query(
        `DELETE FROM "gender" WHERE "id" = $1;`,[id]
    );
    return !!result.rowCount;
};

/** 
 * Update the name of one gender
 * @param {string} - name of the gender
 * @param {number} - id of the gender 
 * @returns {Object} - gender updated
*/
async function updateOne(id, name) {
    const result = await pool.query(
        `UPDATE "gender" 
        SET "name" = $2
        WHERE "id" = $1
        RETURNING *;`,[id, name]
    );
    return result.rows[0];
  };

  module.exports = {
    findAll,
    findById,
    findByName,
    insertOne,
    deleteOne,
    updateOne
  };
