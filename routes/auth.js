const express = require('express');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();

// 회원가입 라우트
router.get('/signup', (req, res) => {
  res.render('register');
});

router.post('/signup', async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }
    const newUser = await User.create({ email, password, name });
    res.status(201).json({ message: '회원가입이 완료되었습니다.', userId: newUser.id });
  } catch (error) {
    next(error);
  }
});

// 로그인 라우트
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json(info);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: '로그인 성공', userId: user.id });
    });
  })(req, res, next);
});

// 로그아웃 라우트
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/'); // 또는 원하는 페이지로 리디렉션
  });
});

module.exports = router;