"use strict";
import { Sequelize } from "sequelize";
import config from "../../../config";
const dbOptions: any = {
  dialect: "postgres",
  host: config.db_host,
  port: config.db_port,
};

const db: any = {};
let sequelize: any;
sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_pass,
  dbOptions
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(function (err) {
    console.log("DB Error: ", err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require("./users")(sequelize, Sequelize);
db.sequelize
  .sync()
  .then(() => {
    console.log("This is the sync after the call----->");
    db.users
      .create({
        firstName: "MDO User",
        lastName: "2.0",
        userName: "mdouser",
        email: "demo@mdo.com",
        //pwd-123456
        password:
          "$2a$12$.0FaHmF/5gMiCODEWLnCSeBw3qZDcPdHaMW/nP/oZx3vIy8tD9OAK",
        hash: "$2a$12$.0FaHmF/5gMiCODEWLnCSeBw3qZDcPdHaMW/nP/oZx3vIy8tD9OAK",
        role: "superadmin",
      })
      .then(() => {
        console.log(`🚀  Database Tables Created Successfully!`);
      })
      .catch((error) => {
        console.log("DB Error:" + error);
      });
  })
  .catch((error) => {
    console.log("DB Error:" + error);
  });
export default db;
