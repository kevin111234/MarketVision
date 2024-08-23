const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const newsUrl = process.env.NEWS_URL;
const indexUrl1 = process.env.INDEX_URL1;
const indexUrl2 = process.env.INDEX_URL2;
const indexUrl3 = process.env.INDEX_URL3;
const indexUrl4 = process.env.INDEX_URL4;
const exchangeRateUrl = process.env.EXCHANGE_RATE_URL;

// HTTPS 에이전트 설정
const agent = new https.Agent({
    rejectUnauthorized: false,  // 인증서 검증 비활성화 (개발 환경에서만 사용)
    secureProtocol: 'TLSv1_2_method'  // TLS 버전 명시적으로 설정
});

router.get('/', async (req, res) => {
  let news = [];
  let graphData1 = null, graphData2 = null, graphData3 = null, graphData4 = null;
  let exchangeRate = null;

  try {
    // FastAPI에서 뉴스 데이터를 가져옴
    const newsResponse = await axios.get(newsUrl, { httpsAgent: agent });
    news = newsResponse.data;
  } catch (error) {
    console.error('Error fetching news:', error.message);
  }

  // 각 인덱스에 대한 그래프 데이터를 개별적으로 가져오기
  try {
    const graphResponse1 = await axios.get(indexUrl1, { httpsAgent: agent });
    graphData1 = graphResponse1.data;
  } catch (error) {
    console.error('Error fetching graph data for index 1:', error.message);
  }

  try {
    const graphResponse2 = await axios.get(indexUrl2, { httpsAgent: agent });
    graphData2 = graphResponse2.data;
  } catch (error) {
    console.error('Error fetching graph data for index 2:', error.message);
  }

  try {
    const graphResponse3 = await axios.get(indexUrl3, { httpsAgent: agent });
    graphData3 = graphResponse3.data;
  } catch (error) {
    console.error('Error fetching graph data for index 3:', error.message);
  }

  try {
    const graphResponse4 = await axios.get(indexUrl4, { httpsAgent: agent });
    graphData4 = graphResponse4.data;
  } catch (error) {
    console.error('Error fetching graph data for index 4:', error.message);
  }

  // FastAPI에서 환율 데이터를 가져옴
  try {
    const exchangeRateResponse = await axios.get(exchangeRateUrl, { httpsAgent: agent });
    exchangeRate = exchangeRateResponse.data.exchange_rate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error.message);
  }

  // dashboard 페이지 렌더링, 뉴스와 그래프 데이터, 환율 정보를 전달
  res.render('dashboard', { 
    news, 
    graphData1: JSON.stringify(graphData1),
    graphData2: JSON.stringify(graphData2),
    graphData3: JSON.stringify(graphData3),
    graphData4: JSON.stringify(graphData4),
    exchangeRate
  });
});

module.exports = router;