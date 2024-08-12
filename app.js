const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
// .env 설정 불러오기
dotenv.config();

// 기본적인 세팅 (포트, view)
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 라우팅 호출
const indexRouter = require('./routes');

app.use(morgan('dev'));
// 요청 응답
app.use('/', indexRouter);

// error 발생 시
app.use((req, res, next) => {
  res.status(404).send('Not Found')
})

app.listen(app.get('port'), ()=> {
  console.log(app.get('port'), '번 포트에서 대기 중')
})