const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');  // connect-flash 모듈 추가

const config = require('../config/configenv');

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true })); 
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
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
}