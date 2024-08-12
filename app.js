const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks')

// .env 설정 불러오기
dotenv.config();
const app = express();
// 라우팅 호출
const indexRouter = require('./routes');

// port, view 설정
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

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