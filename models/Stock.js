const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Stock', {
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    industry_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    exchange: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
    tableName: 'Stock',
    timestamps: false,
  });
};
