const pool = require("../config/database");

/**
 * Return tous les resultats
 * @return {result[]} result
 */
 async function findAll() {
    const result = await pool.query(`SELECT * FROM "result"`);
    pool.end();
    return result.rows;
};

/**
 * Return un resultat
 * @param {number} id le resultat choisis
 * @return {object} le resultat en question
 */
 async function findById(id) {
    const result = await pool.query(`SELECT * FROM "result" WHERE "id" = $1`, [id]);
    pool.end();
    return result.rows[0];
};

/**
 * Insert un resultat
 * @param {string} - resulat rentré
 * @return {object} - nouveau resultat
 */
 async function insertOne(result) {
    const result = await pool.query(
        `INSERT INTO "result"
        VALUES ($1)
        RETURNING *`, [result]
    );
    pool.end();
    return result.rows[0];
};

/**
 * Supprimer un result
 * @param {number} -id du result
 * @return {boolean} - vrai si le result est supprimer
 */
 async function deleteOne(id) {
    const result = await pool.query(
        `DELETE FROM "result" WHERE "id" = $1`, [id]
    );
    pool.end();
    return !!result.rowCount;
};

/**
 * update le nom du result
 * @param {string} -label du result
 * @param {number} - id du result
 * @return {object} -result mis à jour
 */
 async function updateOne(id, label) {
    const result = await pool.query(
        `UPDATE "result"
        SET "name" = $1
        WHERE "id" = $2
        RETURNING *
        `, [id, label]
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