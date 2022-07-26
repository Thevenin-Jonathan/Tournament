const pool = require("../config/database");

/**
 * Return all "result" from database
 * @returns {result[]} result
 */
 async function findAll() {
    const result = await pool.query(`SELECT * FROM "result"`);
    return result.rows;
};

/**
 * Return one "result" from database
 * @param {number} id result identifiant
 * @returns {object} result
 */
 async function findById(id) {
    const result = await pool.query(`SELECT * FROM "result" WHERE "id" = $1`, [id]);
    return result.rows[0];
};

/**
 * Insert one "result" in database
 * @param {string} label of result
 * @returns {object} Return new result
 */
 async function insertOne(label) {
    const result = await pool.query(
        `INSERT INTO result("label")
        VALUES ($1)
        RETURNING *`, [label]
    );
    return result.rows[0];
};

/** 
 * Delete one result from DB
 * @param {number}  id of the result
 * @returns {boolean} - true if the result is deleted
*/
 async function deleteOne(id) {
    const result = await pool.query(
        `DELETE FROM "result" WHERE "id" = $1`, [id]
    );
    return !!result.rowCount;
};

/** 
 * Update result
 * @param {string}  label of the result
 * @param {number}  id of the result 
 * @returns {Object} - "result" updated
*/
 async function updateOne(id, label) {
    const result = await pool.query(
        `UPDATE "result"
        SET "label" = $2
        WHERE "id" = $1
        RETURNING *
        `, [id, label]
    );
    return result.rows[0];
};
  
module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne,
    updateOne
  }