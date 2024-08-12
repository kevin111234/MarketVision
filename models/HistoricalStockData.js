const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('HistoricalStockData', {
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    open: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    high: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    low: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    close: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    volume: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'HistoricalStockData',
    timestamps: false,
    uniqueKeys: {
      actions_unique: {
        fields: ['stock_id', 'date']
      }
    }
  });
};
