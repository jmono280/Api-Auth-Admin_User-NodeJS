const config = require("../config/_database.js");

const Sequelize = require("sequelize");

const db_sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.sequelize = db_sequelize;

db.user = require("./user.js")(db_sequelize, Sequelize);
db.roles = require("./roles.js")(db_sequelize, Sequelize);

module.exports = db;
