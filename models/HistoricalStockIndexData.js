const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HistoricalStockIndexData = sequelize.define('HistoricalStockIndexData', {
    index_id: {
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
      allowNull: true,
    },
  }, {
    tableName: 'HistoricalStockIndexData',
    timestamps: false,
    uniqueKeys: {
      actions_unique: {
        fields: ['index_id', 'date']
      }
    }
  });

  HistoricalStockIndexData.associate = (models) => {
    HistoricalStockIndexData.belongsTo(models.StockIndex, { foreignKey: 'index_id', onDelete: 'CASCADE' });
  };

  return HistoricalStockIndexData;
};
