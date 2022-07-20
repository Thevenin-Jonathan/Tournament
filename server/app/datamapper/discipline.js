// updateOne(id)
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

// insertOne() Ajoute une nouvelle discipline a la BDD
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

// deleteOne(id) Enleve une discipline de la BDD
async function deleteOne(disciplineId) {
    const result = await pool.query(`DELETE FROM "discipline" WHERE "id" = $1;`, [disciplineId]);
  
    return result.rowCount;
  };



module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne
}

