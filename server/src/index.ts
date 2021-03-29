const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const { review, setting } = require('./routes');
const bodyParser = require('koa-bodyparser');

// 装载所有子路由
router.use('/review', review.routes(), review.allowedMethods());
router.use('/setting', setting.routes(), setting.allowedMethods());

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());

// 加载body解析器中间件，用于解决POST请求中的body问题
app.use(bodyParser());

app.use( async ( ctx: any ) => {
  ctx.body = '服务器默认首页'
})

app.listen(8080);
console.log('server is starting at port 8080...')
export {};
