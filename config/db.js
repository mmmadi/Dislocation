const Pool = require("pg").Pool;
const config = require("./default")

const databaseConfig = config.dbConfig;
const pool = new Pool(databaseConfig);

// const pool = new Pool();

module.exports = pool;
