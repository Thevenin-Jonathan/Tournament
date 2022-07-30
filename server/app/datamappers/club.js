const pool = require("../config/database");

/**
 * Return all clubs from database
 * @returns {Object[]} clubs
 */
async function findAll() {
  const result = await pool.query(`SELECT * FROM "club" ORDER BY "id" ASC`);
  return result.rows;
};

/**
 * Return one club from database
 * @param {number} id club identifiant
 * @returns {object} club
 */
async function findById(id) {
  const result = await pool.query(`SELECT * FROM "club" WHERE "id" = $1`, [id]);
  return result.rows[0];
};

/**
 * Insert one club in database
 * @param {object} club 
 * @returns {object} club
 */
async function insertOne(club) {
  const columns = Object.keys(club).map(name => `"${name}"`);
  const values = Object.values(club);
  const symbols = values.map((_, i) => `$${i + 1}`);

  const result = await pool.query(
    `
      INSERT INTO "club"
        (${columns})
      VALUES
        (${symbols})
      RETURNING *;
    `,      
    [...values]
  )

  return result.rows[0];
};

/**
 * Update one club in database
 * @param {number} id club identifiant
 * @param {object} club club informations
 * @returns {object} club
 */
async function updateOne(id, club) {
  const columns = Object.keys(club).map((name, i) => `"${name}" = $${i + 1}`);
  const values = Object.values(club);
  const result = await pool.query(
    `
      UPDATE "club" SET
        ${columns}
      WHERE
        id = $${columns.length + 1}
      RETURNING *;
    `,
    [...values, id]
  );

  return result.rows[0];
};

/**
 * Delete one club from database
 * @param {number} id club identifiant
 * @returns {boolean} true if club was delete
 */
async function deleteOne(id) {
  const result = await pool.query(
    `
      DELETE FROM "club" WHERE id = $1
    `,
    [id]
  );

  return !!result.rowCount;
};

/**
 * Verify if the club is already in DB by unique variables
 * @param {object} club club informations
 * @param {number} id club identifiant
 * @returns {boolean} true if already exist
 */
async function exist(club, id) {
  const columns = [];
  const values = [];

  Object.entries(club).forEach(([key, val]) => {
    if (["club_ref", "email", "website"].includes(key)) {
      columns.push(`"${key}" = $${columns.length + 1}`);
      values.push(val);
    };
  })

  const query = {
    text: `SELECT * FROM "club" WHERE ${columns.join(" OR ")}`,
    values
  }

  if (id) {
    query.text += ` AND id = $${values.length + 1}`,
    query.values.push(id)
  }

  const result = await pool.query(query);

  return !!result.rowCount;
};

module.exports = {
  findAll,
  findById,
  insertOne,
  updateOne,
  deleteOne,
  exist
};

