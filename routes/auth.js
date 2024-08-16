const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // User 모델 가져오기

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

// 회원가입 페이지 렌더링
router.get('/signup', (req, res) => {
  res.render('register', { title: 'Register' });
});

// 회원가입 처리
router.post('/signup', async (req, res, next) => {
  const { email, password, name } = req.body;  // name 필드를 받아옴
  if (!name) {
    return res.status(400).send('Name is required');  // 이름이 없는 경우 오류 반환
  }
  try {
    // 이메일 중복 체크
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,  // 이름 필드 저장
    });

    // 회원가입 성공 후 로그인 페이지로 리다이렉트
    res.redirect('/auth/login');
  } catch (error) {
    next(error);
  }
});

// 로그아웃
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;