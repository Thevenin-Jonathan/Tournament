const pool = require("../config/database");


    /**
     * Tous les types dans la base de donnée
     * @returns {object[]} La liste des types
     */
    async function findAll() {
        const result = await pool.query(`SELECT * FROM "type"`);
        pool.end();
        return result.rows;
    };

    /**git fetch origin
git checkout "20-database-role"
     * findById(id) Recupere un type en function de son id
     * @param {number} id- L'id du type souhaité
     * @returns Le type souhaité ou null si aucuns type à cet id
     * @return {object} un type
     */
    async function findById(id) {
        const result = await pool.query(`SELECT * FROM "type" WHERE "id" = $1;`, [id]);
        pool.end();
        return result.rows[0];
    };

    /**
     * Ajoute dans la base de données
     * @param {string} - type - Les données à insérer, nom du nouveau type
     * @returns {object} Le type insérer
     */
    async function insertOne(type) {
        const result = await pool.query(
            `
        INSERT INTO type ("name")
        VALUES($1)
        RETURNING *;`, [type]
        );
        pool.end();
        return result.rows[0];
    };

    /**
     * updateOne(id) Change les informations (name) d'un type
     * @param {string} - nom du type 
     * @param {number} - id du type 
     * @returns {object} - type updated
     */
    async function updateOne(id, name) {
        const result = await pool.query(
              `
              UPDATE "type" SET 
              "name" = $1
              WHERE "id" = $2
              RETURNING *;`, [id,name]
        );
        pool.end();
        return result.rows[0];
    };

    /**
     * Supprimer un type de la DB
     * @param {number} - id d'un type
     * @returns {boolean} - true si le type est deleted
     */
    async function deleteOne(id) {
        const result = await pool.query(`DELETE FROM "discipline" WHERE "id" = $1;`, [id]);
        pool.end();
        return !!result.rowCount;
    };

module.exports = {
        findAll,
        findById,
        insertOne,
        updateOne,
        deleteOne
};

