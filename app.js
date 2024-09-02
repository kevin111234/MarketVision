const express = require('express');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');
// required local files
const config = require('./config/configenv');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const detailRouter = require('./routes/stockDetail');
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
sequelize.sync({ force: false })  // force: true로 설정하면 기존 테이블이 삭제되고 다시 생성됩니다.
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to create tables:', err);
  });

// routing
app.use('/', indexRouter);
app.use('api/', apiRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/details', detailRouter);

// error handler
app.use(errorHandler.notFound);
app.use(errorHandler.handleError);

app.listen(app.get('port'), ()=> {
  console.log(app.get('port'), '번 포트에서 서버가 실행되었습니다.')
})