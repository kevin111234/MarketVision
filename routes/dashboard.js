const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
      // FastAPI에서 뉴스 데이터를 가져옴
      const response = await axios.get('http://localhost:8000/us-stock-news');
      const news = response.data;

      // dashboard 페이지 렌더링, 뉴스 데이터를 전달
      res.render('dashboard', { news });
  } catch (error) {
      console.error('Error fetching news:', error.message);
      res.render('dashboard', { news: [] });
  }
});

module.exports = router;