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

  async insertOne(user) {
    const result = pool.query(
    `
      INSERT INTO "user"
        ("firstname", "lastname", "address", "birthdate", "is_active", "email", "password", "url_avatar", "player_license", "club_id", "role_id", "phone", "gender_id")
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
      RETURNING *
    `,
    [
      user.firstname,
      user.lastname,
      user.address || null,
      user.phone || null,
      user.birthdate,
      user.isActive,
      user.email,
      user.password,
      user.urlAvatar || null,
      user.playerLicense || null,
      user.genderId,
      user.clubId,
      user.roleId
    ])
    pool.end();
    return result.rows[0];
  },

}