const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  let news = [];
  let graphDataArray = [];

  try {
    // FastAPI에서 뉴스 데이터를 가져옴
    const newsResponse = await axios.get('http://localhost:8000/us-stock-news');
    news = newsResponse.data;
  } catch (error) {
    console.error('Error fetching news:', error.message);
  }

  // 1부터 4까지의 index ID에 대한 그래프 데이터 가져오기
  for (let i = 1; i <= 4; i++) {
    try {
      const graphResponse = await axios.get(`http://localhost:8000/stock-index/${i}/last-three-months`);
      graphDataArray.push(graphResponse.data);
    } catch (error) {
      console.error(`Error fetching graph data for index ${i}:`, error.message);
      graphDataArray.push(null);
    }
  }

  // dashboard 페이지 렌더링, 뉴스와 그래프 데이터를 전달
  res.render('dashboard', { news, graphDataArray: JSON.stringify(graphDataArray) });
});

module.exports = router;