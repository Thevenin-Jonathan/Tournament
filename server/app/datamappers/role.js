const pool = require("../config/database");

/**
 * Return tous les rôles
 * @return {role[]} roles
 */
async function findAll() {
    const result = await pool.query(`SELECT * FROM "role"`);
    pool.end();
    return result.rows;
};

/**
 * Return un role
 * @param {number} id le role choisis
 * @return {object} le role en question
 */
async function findById(id) {
    const result = await pool.query(`SELECT * FROM "role" WHERE "id" = $1`, [id]);
    pool.end();
    return result.rows[0];
};

/**
 * Insert un role
 * @param {string} - role entré
 * @return {object} - nouveau role
 */
async function insertOne(role) {
    const result = await pool.query(
        `INSERT INTO "role"
        VALUES ($1)
        RETURNING *`, [role]
    );
    pool.end();
    return result.rows[0];
};

/**
 * Supprimer un role
 * @param {number} -id du role
 * @return {boolean} - vrai si le role est supprimer
 */
async function deleteOne(id) {
    const result = await pool.query(
        `DELETE FROM "role" WHERE "id" = $1`, [id]
    );
    pool.end();
    return !!result.rowCount;
};

/**
 * update le nom du role
 * @param {string} -nom du role
 * @param {number} - id du role
 * @return {object} -role mis à jour
 */
async function updateOne(id, name) {
    const result = await pool.query(
        `UPDATE "role"
        SET "name" = $1
        WHERE "id" = $2
        RETURNING *
        `, [id, name]
    );
    pool.end();
    return result.rows[0];
};

(async function test() {
    console.log(await findAll());
  })();

module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne,
    updateOne
  }