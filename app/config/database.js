require("dotenv").config( {path: `${__dirname}/../../.env` });
const connectionString = process.env.PGURL;

const { Pool } = require('pg');
// pools will use environment variables
// for connection information
const pool = new Pool({
  connectionString
});

module.exports = pool;