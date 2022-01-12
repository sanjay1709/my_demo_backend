import bcrypt from "bcryptjs";
import * as Joi from "joi";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { validateRequest } from "../../middleware/validate-request";
import db from "../../models/sql";
import { DataTypes } from "sequelize";
const Users = require("../../models/sql/users")(db.sequelize, DataTypes);

const AdminMutation = {
  adminlogin: async (parent, { email, password }) => {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required()
        .messages({ "string.empty": `Email is a required field` }),
      password: Joi.string()
        .trim()
        .required()
        .messages({ "string.empty": `Password is a required field` }),
    });
    let result = {
      status: null,
      msg: null,
      firstName: null,
      lastName: null,
      userName: null,
      email: null,
      role: null,
      token: null,
      tokenExpiration: null,
    };
    const response = await validateRequest({ email, password }, schema);
    if (response.status === false) {
      result.status = false;
      result.msg = response.message;
      return result;
    } else {
      try {
        const userobject = await Users.findOne({ where: { email: email } });
        if (userobject === null) {
          result.status = false;
          result.msg = "User does not exist";
          return result;
        }
        const passwordMatch = await bcrypt.compare(
          password,
          userobject.password
        );
        if (!passwordMatch) {
          result.status = false;
          result.msg = "Password mismatch";
          return result;
        }
        const token = jwt.sign({ userId: userobject.id }, config.jwtSecret, {
          expiresIn: "1h",
        });
        const updateUser: any = {};
        updateUser.token = token;
        await Users.update(updateUser, { where: { id: userobject.id } });
        result.status = true;
        result.msg = "successfully LoggedIn";
        (result.firstName = userobject.firstName),
          (result.lastName = userobject.lastName),
          (result.userName = userobject.userName),
          (result.email = userobject.email),
          (result.role = userobject.role),
          (result.token = token),
          (result.tokenExpiration = 1);
        return result;
      } catch (error) {
        return error;
      }
    }
  },
};

export { AdminMutation };
