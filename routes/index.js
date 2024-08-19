const express = require('express');
const path = require('path');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth')

router.use((req, res, next) => {
  res.locals.user = req.user || null;  // 로그인된 사용자가 없을 경우 null로 설정
  next();  // 다음 미들웨어나 라우터로 이동
});

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;