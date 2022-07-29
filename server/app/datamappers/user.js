const pool = require("../config/database");

/**
 * Return all users from database
 * @async
 * @returns {users[]} users
 */
async function findAll() {
  const result = await pool.query(`SELECT * FROM "user" ORDER BY "id"`);
  return result.rows;
}

/**
 * Return one user from database
 * @async
 * @param {number} id User identifiant
 * @returns {object} user
 */
async function findById(id) {
  const result = await pool.query(`SELECT * FROM "user" WHERE "id" = $1`, [id]);
  return result.rows[0];
}

/**
 * Return one user from database
 * @async
 * @param {string} email User email
 * @returns {object} user
 */
 async function findByEmail(email) {
  const result = await pool.query(`SELECT * FROM "user" WHERE "email" = $1`, [email]);
  return result.rows[0];
}

/**
 * Insert one user in database
 * @async
 * @param {object} user 
 * @returns {object} user
 */
async function insertOne(user) {
  const columns = Object.keys(user).map(name => `"${name}"`);
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

  return result.rows[0];
}

/**
 * Update one user in database
 * @async
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

  return result.rows[0];
}

/**
 * Delete one user from database
 * @async
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

  return !!result.rowCount;
}

/**
 * Verify if the user is already in DB by unique variables
 * @async
 * @param {object} user user informations
 * @param {number} id user identifiant
 * @returns {boolean} true if already exist
 */
async function exist(user, id) {
  const columns = [];
  const values = [];

  Object.entries(user).forEach(([key, val]) => {
    if (["email", "phone", "player_license"].includes(key)) {
      columns.push(`"${key}" = $${columns.length + 1}`);
      values.push(val);
    }
  })

  const query = {
    text: `SELECT * FROM "user" WHERE ${columns.join(" OR ")}`,
    values
  }

  if (id) {
    query.text += ` AND id = $${values.length + 1}`,
    query.values.push(id)
  }

  const result = await pool.query(query);

  return !!result.rowCount;
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  insertOne,
  updateOne,
  deleteOne,
  exist
}