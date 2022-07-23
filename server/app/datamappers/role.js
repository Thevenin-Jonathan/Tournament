const pool = require("../config/database");

/**
 * Return all roles
 * @return {Object[]} roles
 */
async function findAll() {
    const result = await pool.query(`SELECT * FROM "role"`);
    return result.rows;
};

/**
 * Return one role from database
 * @param {number} id type identifiant
 * @returns {object} type
 */
async function findById(id) {
    const result = await pool.query(`SELECT * FROM "role" WHERE "id" = $1`, [id]);
    return result.rows[0];
};

/**
 * Insert one "role" in database
 * @param {string} name of type
 * @returns {object} Return new type
 */
async function insertOne(role) {
    const result = await pool.query(
        `INSERT INTO "role" ("name")
        VALUES ($1)
        RETURNING *`, [role]
    );
    return result.rows[0];
};

/** 
 * Update the name of one role
 * @param {string} - name of the role
 * @param {number} - id of the role 
 * @returns {Object} - "role" updated
*/
async function updateOne(id, name) {
    const result = await pool.query(
        `UPDATE "role"
        SET "name" = $1
        WHERE "id" = $2
        RETURNING *
        `, [id, name]
    );
    return result.rows[0];
};

/** 
 * Delete one role from DB
 * @param {number} - id of the role
 * @returns {boolean} - true if the role is deleted
*/
async function deleteOne(id) {
    const result = await pool.query(
        `DELETE FROM "role" WHERE "id" = $1`, [id]
    );
    return !!result.rowCount;
};

module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne,
    updateOne
  }