const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ExchangeRate', {
    base_currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    target_currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    close: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'ExchangeRate',
    timestamps: false,
    uniqueKeys: {
      actions_unique: {
        fields: ['base_currency', 'target_currency', 'date']
      }
    }
  });
};
