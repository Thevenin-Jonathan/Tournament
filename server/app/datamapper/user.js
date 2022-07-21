const pool = require("../config/database");

module.exports = {
  async findAll() {
    const result = await pool.query(`SELECT * FROM "user"`);
    pool.end();
    return result.rows;
  },

  async findById(id) {
    const result = pool.query(`SELECT * FROM "user" WHERE "id" = $1`, [id]);
    pool.end();
    return result.rows[0];
  },


}