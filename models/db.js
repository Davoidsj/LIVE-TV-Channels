const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ep-bold-sea-a5lyd313.us-east-2.aws.neon.tech/tvdb?sslmode=require`,
});

module.exports = pool;
