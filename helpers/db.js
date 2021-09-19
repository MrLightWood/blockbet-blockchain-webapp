const config = require("../server/config");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  try{
    // create db if it doesn't already exist
    const connection = await mysql.createConnection({
      host: config.db_host,
      port: config.db_port,
      user: config.db_user,
      password: config.db_password,
    });
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.db_database}\`;`
    );

    // connect to db
    const sequelize = new Sequelize(
      config.db_database,
      config.db_user,
      config.db_password,
      {
        dialect: "mysql",
      }
    );

    // init models and add them to the exported db object
    db.User = require("../models/user")(sequelize);

    // sync all models with database
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
}
