const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const config = require('./config/configenv');

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname,'..', 'public')));
  app.use(cookieParser(config.cookieSecret));
  app.use(session({
    resave: false,
    secret: config.cookieSecret,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    saveUninitialized: true,
  }));
};