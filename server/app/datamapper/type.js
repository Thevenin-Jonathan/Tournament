const pool = require("../config/database");


    /**
     * @returns Tous les types dans la base de donnée
     */

    async function findAll() {
        const result = await pool.query(`SELECT * FROM "type"`);
        pool.end();
        return result.rows;
    };

    /**
     * Récupère par sont id
     * @param {number} typeId - L'id de la type souhaité
     * @returns Le type souhaité ou null si aucuns type à cet id
     */

    // findById(typeId) Recupere un type en function de son id
    async function findByPk(typeId) {
        const result = await pool.query(`SELECT * FROM "type" WHERE "id" = $1;`, [typeId]);
        if (result.rowCount === 0) {
            return undefined;
        }
        pool.end();
        return result.rows[0];
    };

    /**
     * Ajoute dans la base de données
     * @param {InputType} type - Les données à insérer
     * @returns Le type insérer
     */
    // insertOne() Ajoute un nouveau type à la BDD
    async function insertOne(type) {
        const newType = await pool.query(
            `
        INSERT INTO type ("name")
        VALUES($1);
        RETURNING *
        `,
            [type.name],
        );
        pool.end();
        return newType.rows[0];
    };

    // updateOne(id) Change les informations (name) d'un type
    async function updateOne(typeId, typeName) {
        const updateType = {
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
        return result.rows[0];
    };

    // deleteOne(id) Enleve une discipline de la BDD
    async function deleteOne(disciplineId) {
        const result = await pool.query(`DELETE FROM "discipline" WHERE "id" = $1;`, [disciplineId]);
        pool.end();
        return result.rowCount;
    };

    module.exports = {
        findAll,
        findById,
        insertOne,
        updateOne,
        deleteOne
};

