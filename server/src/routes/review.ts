const Router = require('koa-router');
const Sql = require('../sql');

const review = new Router();
const { createReviewTable, selectReview, insertReview, deleteReview } = Sql;

review.get('/', async (ctx: any) => {
  ctx.body = 'welcome to review page!';
})

// 提示TS这里是一个模块，否则会曝模块已声明的问题
export {};
module.exports = review;
