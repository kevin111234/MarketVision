const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  let news = [];
  let graphDataJson = 'null';

  try {
    // FastAPI에서 뉴스 데이터를 가져옴
    const newsResponse = await axios.get('http://localhost:8000/us-stock-news');
    news = newsResponse.data;
  } catch (error) {
    console.error('Error fetching news:', error.message);
  }

  try {
    // FastAPI에서 주식 지표 그래프 데이터를 가져옴
    const graphResponse = await axios.get('http://localhost:8000/stock-index/1/last-three-months');
    const graphData = graphResponse.data;
    graphDataJson = JSON.stringify(graphData);
  } catch (error) {
    console.error('Error fetching graph data:', error.message);
  }

  // dashboard 페이지 렌더링, 뉴스와 그래프 데이터를 전달
  res.render('dashboard', { news, graphDataJson });
});

module.exports = router;