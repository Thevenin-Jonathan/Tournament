const pool = require("../config/database");

/**
 * Return all result
 * @return {result[]} result
 */
 async function findAll() {
    const query = await pool.query(`SELECT * FROM "result"`);
    return query.rows;
};

/**
 * Return one result from database
 * @param {number} id result identifiant
 * @returns {object} result
 */
 async function findById(id) {
    const query = await pool.query(`SELECT * FROM "result" WHERE "id" = $1`, [id]);
    return query.rows[0];
};

/**
 * Insert one result in database
 * @param {string} result of result
 * @returns {object} Return new result
 */
 async function insertOne(result) {
    const query = await pool.query(
        `INSERT INTO "result" ("label")
        VALUES ($1)
        RETURNING *`, [result]
    );
    return query.rows[0];
};

/** 
 * Delete one result from DB
 * @param {number} id of the result
 * @returns {boolean} - true if the result is deleted
*/
 async function deleteOne(id) {
    const query = await pool.query(
        `DELETE FROM "result" WHERE "id" = $1`, [id]
    );
    return !!query.rowCount;
};

/** 
 * Update result
 * @param {string}  result of the result
 * @param {number}  id of the result 
 * @returns {Object} - "result" updated
*/
 async function updateOne(id, label) {
    const query = await pool.query(
        `UPDATE "result"
        SET "name" = $1
        WHERE "id" = $2
        RETURNING *
        `, [id, label]
    );
    return query.rows[0];
};

(async function test() {
    console.log(await deleteOne(1));
  })();

module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne,
    updateOne
  }