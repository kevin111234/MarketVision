const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const newsUrl = process.env.NEWS_URL;
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
    exchangeRate
  });
});

module.exports = router;