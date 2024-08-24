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
  let sp500Graph = null;
  let exchangeRate = null;

  try {
    // S&P 500 그래프 데이터를 FastAPI에서 가져옴 (3개월 데이터를 기본으로 가져옴)
    const graphResponse = await axios.get(`${process.env.API_BASE_URL}/stock-index/1/data?months=1`, { httpsAgent: agent });
    sp500Graph = graphResponse.data.graph;
  } catch (error) {
    console.error('Error fetching S&P 500 graph data:', error.message);
  }

  try {
    const newsResponse = await axios.get(newsUrl, { httpsAgent: agent });
    news = newsResponse.data;
  } catch (error) {
    console.error('Error fetching news:', error.message);
  }

  try {
    const exchangeRateResponse = await axios.get(exchangeRateUrl, { httpsAgent: agent });
    exchangeRate = exchangeRateResponse.data.exchange_rate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error.message);
  }

  res.render('dashboard', { 
    news, 
    exchangeRate,
    sp500Graph
  });
});

module.exports = router;