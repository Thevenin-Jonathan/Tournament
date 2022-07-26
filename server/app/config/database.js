require("dotenv").config( {path: `${__dirname}/../../.env` });

const connectionString = process.env.PG_URL;


const { Pool } = require('pg');
let config;

if (process.env.NODE_ENV === "prod") {
  config = {
    connectionString,
    ssl: { rejectUnauthorized: false }
  }
} else {
  config = {
    connectionString
  }
}

// pools will use environment variables
// for connection information
const pool = new Pool(config);

module.exports = pool;