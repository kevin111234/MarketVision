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
    const graphResponse = await axios.get(`${process.env.API_BASE_URL}/stock-index/4/graph?months=1`, { httpsAgent: agent });
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

router.get('/market-indicators', async (req, res) => {
  let Graph1 = null, Graph2 = null, Graph3 = null, Graph4 = null;

  try {
    // NASDAQ Composite
    const graphResponse1 = await axios.get(`${process.env.API_BASE_URL}/stock-index/1/graph?months=3`, { httpsAgent: agent });
    Graph1 = graphResponse1.data.graph;
  } catch (error) {
    console.error('Error fetching NASDAQ Composite graph data:', error.message);
  }

  try {
    // Dow Jones Industrial Average
    const graphResponse2 = await axios.get(`${process.env.API_BASE_URL}/stock-index/3/graph?months=3`, { httpsAgent: agent });
    Graph2 = graphResponse2.data.graph;
  } catch (error) {
    console.error('Error fetching Dow Jones graph data:', error.message);
  }

  try {
    // S&P 500
    const graphResponse3 = await axios.get(`${process.env.API_BASE_URL}/stock-index/4/graph?months=3`, { httpsAgent: agent });
    Graph3 = graphResponse3.data.graph;
  } catch (error) {
    console.error('Error fetching S&P 500 graph data:', error.message);
  }

  try {
    // Russell 2000
    const graphResponse4 = await axios.get(`${process.env.API_BASE_URL}/stock-index/5/graph?months=3`, { httpsAgent: agent });
    Graph4 = graphResponse4.data.graph;
  } catch (error) {
    console.error('Error fetching Russell 2000 graph data:', error.message);
  }

  res.render('stock_index', { 
    Graph1,
    Graph2,
    Graph3,
    Graph4
  });
});

module.exports = router;