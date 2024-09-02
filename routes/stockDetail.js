const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const apiUrl = process.env.API_BASE_URL;

// HTTPS 에이전트 설정
const agent = new https.Agent({
  rejectUnauthorized: false,  // 인증서 검증 활성화 (운영 환경에서는 반드시 true)
  secureProtocol: 'TLSv1_2_method'  // 최신 TLS 버전 사용
});

router.get('/stocks/:symbol/detail', async (req, res) => {
  const { symbol } = req.params;
  let stockInfo = null;
  let stockHistorical = null;
  let stockGraph = null;

  try {
    // 주식 정보 가져오기
    const infoResponse = await axios.get(`${apiUrl}/stocks/${symbol}/info`, { httpsAgent: agent });
    stockInfo = infoResponse.data;
  } catch (error) {
    console.error('Error fetching stock info:', error.message);
  }

  try {
    // 주식 히스토리 가져오기
    const historicalResponse = await axios.get(`${apiUrl}/stocks/${symbol}/historical`, { httpsAgent: agent });
    stockHistorical = historicalResponse.data;
  } catch (error) {
    console.error('Error fetching stock historical data:', error.message);
  }

  try {
    // 주식 그래프 데이터 가져오기
    const graphResponse = await axios.get(`${apiUrl}/stocks/${symbol}/graph`, { httpsAgent: agent });
    stockGraph = graphResponse.data.graph;
  } catch (error) {
    console.error('Error fetching stock graph data:', error.message);
  }

  res.render('stockDetail', { 
    stockInfo, 
    stockHistorical, 
    stockGraph
  });
});

module.exports = router;