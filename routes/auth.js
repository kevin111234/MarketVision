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
    res.status(200).json({ message: '회원가입 성공', redirectUrl: '/' });  // 리디렉션 URL을 클라이언트에 전송
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    next(error);
  }
});

// 로그인 라우트
router.get('/login', (req, res) => {
  res.render('login');  // login.html 파일을 렌더링
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message || '로그인에 실패했습니다.' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: '로그인 성공', redirectUrl: '/' });  // 리디렉션 URL을 클라이언트에 전송
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