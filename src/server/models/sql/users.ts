import { DataTypes } from "sequelize";

module.exports = model;

function model(sequelize) {
  const attributes = {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    userName: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING },
    hash: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING },
    resetToken: { type: DataTypes.STRING },
    resetTokenExpires: { type: DataTypes.DATE },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated: { type: DataTypes.DATE },
  };
  const options = {
    timestamps: false,
    defaultScope: {
      // exclude hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };
  return sequelize.define("user", attributes, options);
}
