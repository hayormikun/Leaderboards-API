const pg = require('pg')
const { Pool, Client } = require('pg')

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnAuthorized: false,
      },
    }
  : {
      user: "postgres",
      password: "bolakale",
      host: "localhost",
      port: "5432",
      database: "leaderboard",
    };

const pool = new Pool(poolConfig);

module.exports = pool;
