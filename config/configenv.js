const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 8000,
  cookieSecret: process.env.cookieSecret
};