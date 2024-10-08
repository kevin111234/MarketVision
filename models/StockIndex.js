const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('StockIndex', {
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'StockIndex',
    timestamps: false,
  });
};
