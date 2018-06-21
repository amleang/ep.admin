const http = require('http');
const Koa = require('koa');
const path = require('path')
const bodyParser =  require('koa-bodyparser')
const errorHandler = require('koa-error');
const compress = require('koa-compress');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/default');
const router =require('./routers');

var app = new Koa();
/* // session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
})) */
/* app.use(errorHandler()); */
// 使用表单解析中间件
app.use(bodyParser())
// compressor
app.use(compress({
    filter: contentType => /text|javascript/i.test(contentType),
    threshold: 2048
}));
//router
router(app);
// 监听端口
http.createServer(app.callback()).listen(config.port);

console.log(`listening on port ${config.port}`)
