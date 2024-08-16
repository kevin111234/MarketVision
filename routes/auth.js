const express = require('express');
const passport = require('passport');

const router = express.Router();

// 로그인 페이지
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// 로컬 로그인 처리
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

// 로그아웃
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;