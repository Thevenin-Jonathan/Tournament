const pool = require("../config/database");

// findAll() Recupère tous les types
async function findAll() {
    const result = await pool.query(`SELECT * FROM "type"`);
    pool.end();
    return result.rows;
};

// findById(id) Recupere un type en function de son id
async function findById(id) {
    const result = await pool.query(`SELECT * FROM "type" WHERE "id" = $1;`, [id]);
    pool.end();
    return result.rows[0];
};

// insertOne() Ajoute un nouveau type à la BDD
async function insertOne(newType) {
    const sql = {
        text: `
        INSERT INTO type ("name")
        VALUES($1);`,
        values: [newType]
    };
    const result = await pool.query(sql);
    pool.end();
    return result.rows[0];
};

// deleteOne(id) Enleve une discipline de la BDD
async function deleteOne(disciplineId) {
    const result = await pool.query(`DELETE FROM "discipline" WHERE "id" = $1;`, [disciplineId]);
    pool.end();
    return result.rowCount;
};

// updateOne(id) Change les informations (name) d'un type
async function updateOne(typeName, typeId) {
    const sql = {
      text: `
          UPDATE "type" SET 
          "name" = $1
          WHERE "id" = $2
          RETURNING *
          `,
      values: [typeName, typeId]
    };
    const result = await pool.query(sql);
    pool.end();
    return result.rowCount;
  };

module.exports = {
    findAll,
    findById,
    insertOne,
    deleteOne,
    updateOne
}

