require("dotenv").config( {path: `${__dirname}/../../.env` });
const connectionString = process.env.PG_URL;

const { Pool } = require('pg');
// pools will use environment variables
// for connection information
const pool = new Pool({
  connectionString
});

module.exports = pool;