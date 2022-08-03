const pool = require("../config/database");

/**
 * Return all player stats from database
 * @async
 * @returns {stats[]} all player stats
 */
async function findAll() {
  const result = await pool.query(
    `
    SELECT *
    FROM "get_all_stats" AS "GAS"
    ORDER BY "GAS"."id";
    `
  );
  return result.rows;
}

/**
 * Return one player stats from database
 * @async
 * @param {number} id User identifiant
 * @returns {object} player stats
 */
async function findById(id) {
  const result = await pool.query(
    `
    SELECT *
    FROM "get_all_stats" AS "GAS"
    WHERE "GAS"."id" = $1
    ORDER BY "GAS"."id";
    `,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  findAll,
  findById
}