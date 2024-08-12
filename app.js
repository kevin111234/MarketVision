const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 8000);


app.get('/', (req, res) =>{
  res.send('Hello, Express');
});

app.listen(app.get('port'), ()=> {
  console.log(app.get('port'), '번 포트에서 대기 중')
})