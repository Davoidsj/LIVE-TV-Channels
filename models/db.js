const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://tvdb_owner:x2MU5hLCtriZ@ep-bold-sea-a5lyd313.us-east-2.aws.neon.tech/tvdb?sslmode=require',
});

module.exports = pool;
