const Router = require('koa-router');
const { selectReview, insertReview, deleteReview, updateReviewLikes } = require('../sql');

const review = new Router();

review.get('/', async (ctx: any) => {
  ctx.body = 'welcome to review page!';
});

review.post('/insert', async (ctx: any) => {
  const req = ctx.request?.body;
  if (!req) {
    ctx.status = 404;
    ctx.body = '抱歉，发表评论参数不足';
    return;
  }
  const { avatarUrl, username, likes, msg, replyId, replyNum, songId } = req;
  const review = {
    avatarUrl,
    username,
    dates: Date.now(),
    likes,
    msg,
    replyId,
    replyNum,
    songId
  }
  try{
    const res = await insertReview(review);
    ctx.status = 200;
    ctx.body = '新增一条留言成功';
  } catch(e) {
    ctx.status = 404;
    ctx.body = '新增留言失败';
  }
});

review.get('/select', async (ctx: any) => {
  const req = ctx.request?.query;

  if(!req) {
    ctx.status = 404;
    ctx.body = '抱歉，没有找到相应的评论';
    return;
  }
  const { replyId, songId } = req;
  try{
    const res: any = await selectReview(replyId, songId);
    ctx.status = 200;
    ctx.body = res;
  } catch(e) {
    ctx.status = 404;
    ctx.body = [];
  }
});

review.post('/delete', async (ctx: any) => {
  const req = ctx.request?.body;
  if(!req) {
    ctx.status = 404;
    ctx.body = '抱歉，要删除的评论不存在';
    return;
  }
  const { reviewId } = req;
  try{
    const res = await deleteReview(reviewId);
    ctx.status = 200;
    ctx.body = '删除评论成功';
  } catch(e) {
    ctx.status = 404;
    ctx.body = '删除评论失败';
  }
});

review.post('/update', async (ctx: any) => {
  const req = ctx.request?.body;
  if(!req) {
    ctx.status = 404;
    ctx.body = '抱歉，你要点赞的评论不存在';
    return;
  }
  const { likes, reviewId } = req;
  try{
    const res = await updateReviewLikes(likes, reviewId);
    ctx.status = 200;
    ctx.body = '更新评论点赞数成功';
  } catch(e) {
    ctx.status = 404;
    ctx.body = '更新评论点赞数失败';
  }
});

// 提示TS这里是一个模块，否则会曝模块已声明的问题
export {};
module.exports = review;
