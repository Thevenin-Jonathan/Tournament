const pool = require("../config/database");

/**
 * Return all "type" from database
 * @returns {Object[]} type
 */
async function findAll() {
    const result = await pool.query(`SELECT * FROM "type" ORDER BY "id" ASC`);
    return result.rows;
};

/**
 * Return one "type" from database
 * @param {number} id type identifiant
 * @returns {object} type
 */
async function findById(id) {
    const result = await pool.query(`SELECT * FROM "type" WHERE "id" = $1`, [id]);
    return result.rows[0];
};

/**
 * Insert one "type" in database
 * @param {string} name name type
 * @returns {object} Return new type
 */
async function insertOne(name) {
    const result = await pool.query(`INSERT INTO "type" ("name") VALUES ($1) RETURNING *`, [name]);
    return result.rows[0];
};

/** 
 * Update the name of one type
 * @param {number} - id of the type 
 * @param {string} - name of the type 
 * @returns {Object} - "type" updated
*/
async function updateOne(id, name) {
    const result = await pool.query(`
          UPDATE "type" 
          SET "name" = $2
          WHERE "id" = $1
          RETURNING *
          `, [id, name]);
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

/**
 * Get one type from database
 * @param {string} name type name
 * @returns {object} name
 */
async function findByName(name) {
    const result = await pool.query(`SELECT * FROM "type" WHERE "name" = $1`, [name]);
    return result.rows[0];
}

module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne,
    updateOne,
    findByName
}

