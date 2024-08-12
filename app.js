const express = require('express');
const nunjucks = require('nunjucks');
// required local files
const config = require('./config/configenv');
const indexRouter = require('./routes/index');
const errorHandler = require('./errorHandler');
const applyMiddleware = require('./middleware/middleware');

const app = express();

// .env settings
app.set('port', config.port);

// view setting
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
// middleware
applyMiddleware(app);

// routing
app.use('/', indexRouter);

// error handler
app.use(errorHandler.notFound);
app.use(errorHandler.handleError);

app.listen(app.get('port'), ()=> {
  console.log(app.get('port'), '번 포트에서 서버가 실행되었습니다.')
})