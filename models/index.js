const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  dialectOptions: config.dialectOptions
});

// 모델 불러오기
const Stock = require('./Stock')(sequelize);
const HistoricalStockData = require('./HistoricalStockData')(sequelize);
const StockIndex = require('./StockIndex')(sequelize);
const HistoricalStockIndexData = require('./HistoricalStockIndexData')(sequelize);
const Commodity = require('./Commodity')(sequelize);
const HistoricalCommodityData = require('./HistoricalCommodityData')(sequelize);
const ExchangeRate = require('./ExchangeRate')(sequelize);
const DollarIndex = require('./DollarIndex')(sequelize);

// 모델 관계 설정
HistoricalStockData.belongsTo(Stock, { foreignKey: 'stock_id', onDelete: 'CASCADE' });
HistoricalStockIndexData.belongsTo(StockIndex, { foreignKey: 'index_id', onDelete: 'CASCADE' });
HistoricalCommodityData.belongsTo(Commodity, { foreignKey: 'commodity_id', onDelete: 'CASCADE' });

// 내보내기
module.exports = {
  sequelize,
  Stock,
  HistoricalStockData,
  StockIndex,
  HistoricalStockIndexData,
  Commodity,
  HistoricalCommodityData,
  ExchangeRate,
  DollarIndex,
};