require("dotenv").config({path: __dirname + "./../../.env"});
const pool = require("../config/database");

/**
 * Return all users from database
 * @returns {users[]} users
 */
async function findAll() {
  const result = await pool.query(`SELECT * FROM "user"`);
  pool.end();
  return result.rows;
}

/**
 * Return one user from database
 * @param {number} id User identifiant
 * @returns {object} user
 */
async function findById(id) {
  const result = await pool.query(`SELECT * FROM "user" WHERE "id" = $1`, [id]);
  pool.end();
  return result.rows[0];
}

/**
 * Insert one user in database
 * @param {object} user 
 * @returns {object} user
 */
async function insertOne(user) {
  const columns = Object.keys(user).map((name, i) => `"${name}"`);
  const values = Object.values(user);
  const symbols = values.map((_, i) => `$${i + 1}`);

  const result = await pool.query(
    `
      INSERT INTO "user"
        (${columns})
      VALUES
        (${symbols})
      RETURNING *;
    `,      
    [...values]
  )

  pool.end();
  return result.rows[0];
}

/**
 * Update one user in database
 * @param {number} id user identifiant
 * @param {object} user user informations
 * @returns {object} user
 */
async function updateOne(id, user) {
  const columns = Object.keys(user).map((name, i) => `"${name}" = $${i + 1}`);
  const values = Object.values(user);
  const result = await pool.query(
    `
      UPDATE "user" SET
        ${columns}
      WHERE
        id = $${columns.length + 1}
      RETURNING *;
    `,
    [...values, id]
  );

  pool.end();
  return result.rows[0];
}

/**
 * Delete one user from database
 * @param {number} id user identifiant
 * @returns {boolean} true if user was delete
 */
async function deleteOne(id) {
  const result = await pool.query(
    `
      DELETE FROM "user" WHERE id = $1
    `,
    [id]
  );

  pool.end();
  return !!result.rowCount;
}
}