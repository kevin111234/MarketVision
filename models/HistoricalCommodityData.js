// const { DataTypes } = require('sequelize');
// 
// module.exports = (sequelize) => {
//   const HistoricalCommodityData = sequelize.define('HistoricalCommodityData', {
//     commodity_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     open: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     high: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     low: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     close: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     volume: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//     },
//   }, {
//     tableName: 'HistoricalCommodityData',
//     timestamps: false,
//     uniqueKeys: {
//       actions_unique: {
//         fields: ['commodity_id', 'date']
//       }
//     }
//   });
// 
//   HistoricalCommodityData.associate = (models) => {
//     HistoricalCommodityData.belongsTo(models.Commodity, { foreignKey: 'commodity_id', onDelete: 'CASCADE' });
//   };
// 
//   return HistoricalCommodityData;
// };
// 