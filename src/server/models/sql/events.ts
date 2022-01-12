module.exports = (sequelize, DataTypes) => {
  return sequelize.define("events", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING(256), allowNull: false },
    description: { type: DataTypes.STRING(256), allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    organizer: { type: DataTypes.STRING(256), allowNull: false },
  });
};
