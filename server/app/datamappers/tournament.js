const pool = require("../config/database");

/**
 * Return all tournaments from database
 * @returns {tournaments[]} tournaments
 */
async function findAll() {
  const result = await pool.query(`SELECT * FROM "tournament"`);
  return result.rows;
}

/**
 * Return one tournament from database
 * @param {number} id tournament identifiant
 * @returns {object} tournament
 */
async function findById(id) {
  const result = await pool.query(`SELECT * FROM "tournament" WHERE "id" = $1`, [id]);
  return result.rows[0];
}

/**
 * Insert one tournament in database
 * @param {object} tournament tournament informations
 * @returns {object} tournament
 */
async function insertOne(tournament) {
  const columns = Object.keys(tournament).map(key => `"${key}"`);
  const values = Object.values(tournament);
  const symbols = values.map((_, i) => `$${i + 1}`);

  const result = await pool.query(
    `
      INSERT INTO "tournament"
        (${columns})
      VALUES
        (${symbols})
      RETURNING *;
    `,      
    [...values]
  )

  return result.rows[0];
}


module.exports = {
  findAll,
  findById,
  findByEmail,
  insertOne,
}