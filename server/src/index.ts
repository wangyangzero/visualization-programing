const Koa = require('koa');
const Router = require('koa-router');
const { review, setting } = require('./routes');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

// 装载所有子路由
router.use('/review', review.routes(), review.allowedMethods());
router.use('/setting', setting.routes(), setting.allowedMethods());

// 加载body解析器中间件，用于解决POST请求中的body问题
// ！注意 bodyParser中间件的注册必须早于路由中间件的注册
app.use(bodyParser());

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());

app.use( async ( ctx: any ) => {
  ctx.body = '服务器默认首页'
})

app.listen(8080);
console.log('server is starting at port 8080...')
export {};
