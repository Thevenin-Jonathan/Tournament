const pool = require("../config/database");

/**
 * findAll() Return all "type" from database
 * @returns {Object[]} type
 */
async function findAll() {
    const result = await pool.query(`SELECT * FROM "type"`);
    return result.rows;
};

/**
 * findById(id) Return one "type" from database
 * @param {number} id type identifiant
 * @returns {object} type
 */
async function findById(id) {
    const result = await pool.query(`SELECT * FROM "type" WHERE "id" = $1`, [id]);
    return result.rows[0];
};

/**
 * insertOne(type) Insert one "type" in database
 * @param {string} name of type
 * @returns {object} Return new type
 */
async function insertOne(type) {
    const result = await pool.query(`INSERT INTO type ("name") VALUES($1) RETURNING *`, [type]);
    pool.end();
    return result.rows[0];
};

/** 
 * Update the name of one type
 * @param {string} - name of the type
 * @param {number} - id of the type 
 * @returns {Object} - "type" updated
*/
async function updateOne(name, id) {
    const result = await pool.query(`
          UPDATE "type" SET 
          "name" = $1
          WHERE "id" = $2
          RETURNING *
          `, [name, id]);
    return result.rows[0];
  };

  /** 
 * Delete one type from DB
 * @param {number} - id of the type
 * @returns {boolean} - true if the type is deleted
*/
async function deleteOne(id) {
    const result = await pool.query(`DELETE FROM "type" WHERE "id" = $1`, [id]);
    return !!result.rowCount;
};

module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne,
    updateOne
}

