const Router = require('koa-router');

const setting = new Router();

setting.get('/', async (ctx: any) => {
  ctx.body = 'welcome to setting page!';
})

// 提示TS这里是一个模块，否则会曝模块已声明的问题
export {};
module.exports = setting;
