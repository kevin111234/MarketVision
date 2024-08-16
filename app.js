const express = require('express');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');
// required local files
const config = require('./config/configenv');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const errorHandler = require('./errorHandler');
const applyMiddleware = require('./middleware/middleware');
const passportConfig = require('./passport');

const app = express();

// .env settings
app.set('port', config.port);
passportConfig();

// view setting
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
// middleware
applyMiddleware(app);

// database
sequelize.sync({ force: false })
  .then(() => {
    console.log('database 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

// routing
app.use('/', indexRouter);
app.use('api/', apiRouter);
app.use('/auth', authRouter);

// error handler
app.use(errorHandler.notFound);
app.use(errorHandler.handleError);

app.listen(app.get('port'), ()=> {
  console.log(app.get('port'), '번 포트에서 서버가 실행되었습니다.')
})