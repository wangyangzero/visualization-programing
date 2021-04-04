const Router = require('koa-router');
const { selectPageLayout, updatePageLayout } = require('../sql');

const setting = new Router();

setting.get('/', async (ctx: any) => {
  ctx.body = 'welcome to setting page!';
});

setting.get('/select', async (ctx: any) => {
  const req = ctx.request?.query;

  if(!req) {
    ctx.status = 404;
    ctx.body = '抱歉，没有找到相应的页面布局配置';
    return;
  }
  const { pageKey } = req;
  try{
    const res: any = await selectPageLayout(pageKey);
    ctx.status = 200;
    ctx.body = res;
  } catch(e) {
    ctx.status = 404;
    ctx.body = '查询页面布局配置失败';
  };
});

setting.post('/update', async (ctx: any) => {
  const req = ctx.request?.body;

  if(!req) {
    ctx.status = 404;
    ctx.body = '抱歉，更新页面布局配置失败';
    return;
  }
  const { pageKey, posList } = req;
  try{
    const res: any = await updatePageLayout(pageKey, posList);
    ctx.status = 200;
    ctx.body = '更新页面布局配置成功';
  } catch(e) {
    ctx.status = 404;
    ctx.body = '更新页面布局配置失败';
  };
});

// 提示TS这里是一个模块，否则会曝模块已声明的问题
export {};
module.exports = setting;
