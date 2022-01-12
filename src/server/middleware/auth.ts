import * as jwt from 'jsonwebtoken';
import config from '../../config';
import db from './../models/sql';
import { DataTypes } from 'sequelize';
const users = require('../models/sql/users')(db.sequelize, DataTypes)

export default async (req: any, res: any, next: any) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  } else {
    console.log(decodedToken);
    users.findOne({
      where: {
        id: decodedToken.userId
      }
    }).then(function (userObject) {
      console.log(userObject);
      if (userObject.token === token) {
        req.isAuth = true;
        req.role = userObject.role;
        req.userId = userObject.id;
        if (userObject.role === 'admin') {
          return next();
        } else {
          req.isAuth = false;
          return next();
        }
      } else {
        req.isAuth = false;
        return next();
      }
    })
  }
};
