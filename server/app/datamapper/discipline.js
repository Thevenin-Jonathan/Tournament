// updateOne(id)
// deleteOne(id)
// Penser à JSDoc sur chaque fonction.

const pool = require("../config/database");

// findAll() Recupere toutes les disciplines
async function findAll() {
    const result = await pool.query(`SELECT * FROM "discipline"`);
    const disciplines = result.rows;
    console.log(disciplines);
    pool.end();
    return disciplines;
};

// findById(id) Recupere une discipline en function de son id
async function findById(disciplineId) {
    const result = await pool.query(`SELECT * FROM "discipline" WHERE "id" = $1;`, [disciplineId]);
    return result.rows[0];
};

// insertOne()
async function insertOne(newDiscipline) {
    const sql = {
      text: `
          INSERT INTO discipline ("name")
          VALUES($1);`,
      values: [newDiscipline]
    };
  
    const result = await pool.query(sql);
  
    return result.rowCount;
  };

module.exports = {
    findAll,
    findById,
    insertOne
}

