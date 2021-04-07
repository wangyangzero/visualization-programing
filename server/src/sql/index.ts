const mysql = require('mysql');
const { 
  createReviewTableSql, 
  insertReviewSql, 
  selectReviewSql, 
  deleteReviewSql, 
  updateReviewLikesSql 
} = require('./review');
const { selectPageLayoutSql } = require('./setting');

// 配置连接数据
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'lucifer',
  password: '19990411',
  database: 'cube_db'
});

// 创建连接
connection.connect();

/** 评论 */
// 创建评论表
const createReviewTable = () => {
  connection.query(createReviewTableSql, function (err: any, res: any) {
    if(err) console.warn(err);
    console.log('结果为：');
    console.log(res);
  });
}

// 插入评论
interface IReview{
  avatarUrl: string;  // 头像链接
  username: string;  // 用户名
  dates: string;  // 日期
  likes: number;  // 点赞数
  msg: string;  // 评论内容
  replyId: number;  // 该评论下留言的主键
  replyNum: number; // 该评论下的回复数
  songId: number;  // 歌曲的标识
}
const insertReview = (review: IReview) => {
  const addReview = [
    review.avatarUrl, 
    review.username, 
    review.dates, 
    review.likes, 
    review.msg,
    review.replyId,
    review.replyNum,
    review.songId
  ];
  return new Promise((res, rej) => {
    connection.query(insertReviewSql, addReview, function(error: any) {
      if(error) {
        console.warn(error);
        rej(error);
      }
      res(true);
    });
  });
};

// 删除评论
const deleteReview = (reviewId: number) => {
  return new Promise((res, rej) => {
    connection.query(deleteReviewSql, [reviewId], function(error: any, result: any) {
      if(error) {
        console.warn(error);
        rej(error);
      }
      console.log(result);
      res(true);
    });
  });
};

// 查询评论列表
const selectReview = (replyId: number, songId: number) => {
  return new Promise((res, rej) => {
    connection.query(selectReviewSql, [replyId, songId], function (error: any, result: any) {
      if(error) {
        rej(error);
      }
      res(result);
    });
  });
};

// 更新评论的点赞数
const updateReviewLikes = (likes: number, reviewId: number) => {
  return new Promise((res, rej) => {
    connection.query(updateReviewLikesSql, [likes, reviewId], function(error: any, result: any) {
      if(error) {
        rej(error);
      }
      res(result);
    })
  })
};

/** 平台 */
// 获取页面组件的布局情况
const selectPageLayout = (pageKey: string) => {
  return new Promise((res, rej) => {
    connection.query(selectPageLayoutSql, [pageKey], function (error: any, result: any) {
      if(error) {
        rej(error);
      }
      res(result);
    });
  });
};

// 更新页面组件的布局情况
const updatePageLayout = (pageKey: string, posList: number[], prePosList: number[]) => {
  let sql: string = 'update component set pos = case pos\n';
  let caseSql: string = '';
  posList.forEach((item, index) => {
    caseSql += `when ${prePosList[index]} then ${item}\n`;
  });
  sql = sql + caseSql + `end\n where pageKey = \"${pageKey}\"`;
  return new Promise((res, rej) => {
    connection.query(sql, function (error: any, result: any) {
      console.log(error)
      if(error) {
        rej(error);
      }
      res(result);
    });
  });
}


export {};
module.exports = {
  createReviewTable,
  selectReview,
  insertReview,
  deleteReview,
  updateReviewLikes,
  selectPageLayout,
  updatePageLayout
};
