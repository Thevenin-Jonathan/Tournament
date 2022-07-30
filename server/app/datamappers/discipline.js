const pool = require("../config/database");

/**
 * Return all disciplines from database
 * @returns {discipline[]} discipline 
 */
async function findAll() {
    const result = await pool.query(`SELECT * FROM "discipline" ORDER BY "id" ASC`);
    return result.rows;
};

/**
 * Return one discipline from database
 * @param {number} id discipline identifiant
 * @returns {object} discipline
 */
async function findById(id) {
    const result = await pool.query(`SELECT * FROM "discipline" WHERE "id" = $1`, [id]);
    return result.rows[0];
};

/**
 * Insert one "discipline" in database
 * @param {string} name name discipline
 * @returns {object} Return new discipline
 */
async function insertOne(name) {
    const result = await pool.query(`INSERT INTO discipline ("name") VALUES($1) RETURNING *`, [name]);
    return result.rows[0];
};

/** 
 * Update the name of one discipline
 * @param {number} - id of the discipline 
 * @param {string} - name of the discipline 
 * @returns {Object} - discipline updated
*/
async function updateOne(id, name) {
    const result = await pool.query(`
          UPDATE "discipline" 
          SET "name" = $2
          WHERE "id" = $1
          RETURNING *
          `, [id, name]);
    return result.rows[0];
  };

  /** 
 * Delete one discipline from DB
 * @param {number} - id of the discipline
 * @returns {boolean} - true if the discipline is deleted
*/
async function deleteOne(id) {
    const result = await pool.query(`DELETE FROM "discipline" WHERE "id" = $1`, [id]);
    return !!result.rowCount;
};

/**
 * Get one discipline from database
 * @param {string} name discipline name
 * @returns {object} name
 */
async function findByName(name) {
    const result = await pool.query(`SELECT * FROM "discipline" WHERE "name" = $1`, [name]);
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

