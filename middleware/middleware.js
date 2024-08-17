const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');  // connect-flash 모듈 추가

const config = require('../config/configenv');
const passport = require('passport');

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
  app.use(flash());  // 플래시 메시지 미들웨어 추가
  app.use(passport.initialize());
  app.use(passport.session());
};