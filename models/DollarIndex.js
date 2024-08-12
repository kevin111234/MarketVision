const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('DollarIndex', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    close: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'DollarIndex',
    timestamps: false,
  });
};
