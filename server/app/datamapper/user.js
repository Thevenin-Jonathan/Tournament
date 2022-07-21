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
  },

  async updateOne(id, user) {
    const result = pool.query(
    `
      UPDATE "user" SET
        "firstname" = $1,
        "lastname" = $2,
        "address" = $3,
        "birthdate" = $4,
        "is_active" = $5,
        "phone" = $6,
        "email" = $7,
        "password" = $8,
        "url_avatar" = $9,
        "player_license" = $10,
        "club_id" = $11,
        "role_id" = $12,
        "gender_id" = $13
      WHERE id = $2
      RETURNING *
    `,
    [
      user.firstname
      ,
      id
    ]);
    pool.end()
    return result.rows[0];
  },

  async deleteOne(id) {

  }
}