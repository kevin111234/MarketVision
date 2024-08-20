const express = require('express');
const router = express.Router();
const axios = require('axios');

const newsUrl = 'http://localhost:8000/us-stock-news'
const indexUrl1 = 'http://localhost:8000/stock-index/1/last-three-months'
const indexUrl2 = 'http://localhost:8000/stock-index/3/last-three-months'
const indexUrl3 = 'http://localhost:8000/stock-index/4/last-three-months'
const indexUrl4 = 'http://localhost:8000/stock-index/5/last-three-months'

router.get('/', async (req, res) => {
  let news = [];
  let graphData1 = null, graphData2 = null, graphData3 = null, graphData4 = null;

  try {
    // FastAPI에서 뉴스 데이터를 가져옴
    const newsResponse = await axios.get(newsUrl);
    news = newsResponse.data;
  } catch (error) {
    console.error('Error fetching news:', error.message);
  }

  // 각 인덱스에 대한 그래프 데이터를 개별적으로 가져오기
  try {
    const graphResponse1 = await axios.get(indexUrl1);
    graphData1 = graphResponse1.data;
  } catch (error) {
    console.error('Error fetching graph data for index 1:', error.message);
  }

  try {
    const graphResponse2 = await axios.get(indexUrl2);
    graphData2 = graphResponse2.data;
  } catch (error) {
    console.error('Error fetching graph data for index 2:', error.message);
  }

  try {
    const graphResponse3 = await axios.get(indexUrl3);
    graphData3 = graphResponse3.data;
  } catch (error) {
    console.error('Error fetching graph data for index 3:', error.message);
  }

  try {
    const graphResponse4 = await axios.get(indexUrl4);
    graphData4 = graphResponse4.data;
  } catch (error) {
    console.error('Error fetching graph data for index 4:', error.message);
  }

  // dashboard 페이지 렌더링, 뉴스와 그래프 데이터를 전달
  res.render('dashboard', { 
    news, 
    graphData1: JSON.stringify(graphData1),
    graphData2: JSON.stringify(graphData2),
    graphData3: JSON.stringify(graphData3),
    graphData4: JSON.stringify(graphData4)
  });
});

module.exports = router;