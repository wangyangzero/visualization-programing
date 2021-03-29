const mysql = require('mysql');
const reviewSql = require('./review');

const { createReviewTableSql, insertReviewSql, selectReviewSql, deleteReviewSql } = reviewSql;

// 配置连接数据
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'lucifer',
  password: '19990411',
  database: 'cube_db'
});

// 创建连接
connection.connect();

// 创建评论表
const createReviewTable = () => {
  connection.query(createReviewTableSql, (err: any, res: any) => {
    if(err) console.warn(err);
    console.log('结果为：');
    console.log(res);
  });
}

// 插入评论
interface IReview{
  reviewId: number;  // 评论主键
  avatarUrl: string;  // 头像链接
  username: string;  // 用户名
  dates: string;  // 日期
  likes: number;  // 点赞数
  msg: string;  // 评论内容
  replyId: number;  // 该评论下留言的主键
  replyNum: number; // 该评论下的回复数
}
const insertReview = (review: IReview) => {
  connection.query(insertReviewSql, review, (err: any, res: any) => {
    if(err) console.warn(err);
    console.log('结果为：');
    console.log(res);
  });
}

// 删除评论
const deleteReview = (reviewId: number) => {
  connection.query(deleteReviewSql, [reviewId],(err: any, res: any) => {
    if(err) console.warn(err);
    console.log('结果为：');
    console.log(res);
  });
}

// 查询评论列表
const selectReview = (reviewId: number) => {
  connection.query(selectReviewSql, [reviewId],(err: any, res: any) => {
    if(err) console.warn(err);
    console.log('结果为：');
    console.log(res);
  });
}

export {};
module.exports = {
  createReviewTable,
  selectReview,
  insertReview,
  deleteReview,
};
