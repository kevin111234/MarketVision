const express = require('express');
const path = require('path');
const router = express.Router();

router.get('api/', (req, res) => {
  res.render();
});

module.exports = router;