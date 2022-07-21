const pool = require("../config/database");

module.exports = {
  async findAll() {
    const result = await pool.query(`SELECT * FROM "user"`);
    pool.end();
    return result.rows;
  },


}