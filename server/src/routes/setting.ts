const Router = require('koa-router');
const { selectPageLayout, updatePageLayout, selectPageStyles, updatePageStyles } = require('../sql');

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
    const data: any = await selectPageLayout(pageKey);
    const res = data.sort((x: any,y: any) => x.pos - y.pos);
    ctx.status = 200;
    ctx.body = res;
  } catch(e) {
    ctx.status = 404;
    ctx.body = [];
  };
});

setting.post('/update', async (ctx: any) => {
  const req = ctx.request?.body;
  if(!req) {
    ctx.status = 404;
    ctx.body = '抱歉，更新页面布局配置失败';
    return;
  }
  const { pageKey, posList, prePosList } = req;
  try{
    const res: any = await updatePageLayout(pageKey, posList, prePosList);
    ctx.status = 200;
    ctx.body = '更新页面布局配置成功';
  } catch(e) {
    ctx.status = 404;
    ctx.body = '更新页面布局配置失败';
  };
});

setting.get('/select/style', async (ctx: any) => {
  const req = ctx.request?.query;
  console.log(req);

  if(!req) {
    ctx.status = 404;
    ctx.body = '抱歉，没有找到相应的页面布局配置';
    return;
  }
  const { pageKey, componentKey } = req;
  try{
    const data: any = await selectPageStyles(pageKey, componentKey);
    let res: any = {};
    for(let key in data[0]) {
      if(data[0][key] !== null) {
        res[key] = data[0][key]
      }
    }
    ctx.status = 200;
    ctx.body = res;
  } catch(e) {
    ctx.status = 404;
    ctx.body = [];
  };
});

setting.post('/update/style', async (ctx: any) => {
  const req = ctx.request?.body;
  if(!req) {
    ctx.status = 404;
    ctx.body = '抱歉，更新页面布局样式失败';
    return;
  }
  console.log(req);
  try{
    const res: any = await updatePageStyles(req);
    console.log(res);
    ctx.status = 200;
    ctx.body = '更新页面布局样式成功';
  } catch(e) {
    console.log(e);
    ctx.status = 404;
    ctx.body = '更新页面布局样式失败';
  };
});

// 提示TS这里是一个模块，否则会曝模块已声明的问题
export {};
module.exports = setting;
