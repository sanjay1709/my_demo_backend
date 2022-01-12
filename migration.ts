

import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import config from './src/config';
import db from './src/server/models/sql';
import { DataTypes } from 'sequelize';

const dbOptions: any = {
  dialect: 'mysql',
  dialectModule: mysql2,
  host: config.mysql_db_host,
  port: config.mysql_db_port,
};

// const db: any = {};
let sequelize: any;
sequelize = new Sequelize(config.mysql_db_name, config.mysql_db_user, config.mysql_db_pass, dbOptions);
sequelize.sync().then(() => {
  sequelize.authenticate()
    .then(() => {
      console.log('Connected to D-B');
    })
    .catch(function (err) {
      console.log("DB Error: ", err);
    });
  });


db.sequelize = sequelize;
db.Sequelize = Sequelize;
const Users = require('./src/server/models/sql/users')(db.sequelize, DataTypes)
db.sequelize.sync().then(() => {
    console.log("inside");
    Users.create({
        firstName: 'Techtaliya',
        lastName: 'Techtaliya',
        userName: 'techtaliya',
        email: 'test@gmail.com',
        //pwd-123456
        password: '$2a$12$.0FaHmF/5gMiCODEWLnCSeBw3qZDcPdHaMW/nP/oZx3vIy8tD9OAK',
        hash: '$2a$12$.0FaHmF/5gMiCODEWLnCSeBw3qZDcPdHaMW/nP/oZx3vIy8tD9OAK',
        role: 'admin'
    }).then(() => {
        console.log(`🚀  Database Tables Created Successfully!`);
    }).catch((error) => {
        console.log('DB Error:' + error);
    });
}).catch((error) => {
    console.log('DB Error:' + error);
});
