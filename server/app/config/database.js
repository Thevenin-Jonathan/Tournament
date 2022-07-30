require("dotenv").config( {path: `${__dirname}/../../.env` });

const connectionString = process.env.DATABASE_URL;


const { Pool } = require('pg');
let config;

if (process.env.NODE_ENV === "production") {
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