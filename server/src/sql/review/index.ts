// 创建评论表
const createReviewTableSql = `
  create table review(
    reviewId int not null auto_increment,
    avatarUrl varchar(100),
    username varchar(20) not null,
    dates varchar(15) not null,
    likes int not null,
    msg varchar(200) not null,
    replyId int,
    replyNum int,
    songId int,
    primary key (reviewId)
  )engine=INNODB auto_increment=1
`

// 插入一条评论
const insertReviewSql = `
  insert into review
  (avatarUrl,username,dates,likes,msg,replyId,replyNum,songId)
  values
  (?, ?, ?, ?, ?, ?, ?, ?)
`

// 删除一条评论
const deleteReviewSql = `
  delete from review where reviewId = ?
`

// 查询评论列表
const selectReviewSql = `
  select * from review where replyId = ? and songId = ?
`

// 更新评论的点赞值
const updateReviewLikesSql = `
  update review set likes = ? where reviewId = ?
`

export{};
module.exports = {
	createReviewTableSql,
	deleteReviewSql,
	selectReviewSql,
	insertReviewSql,
  updateReviewLikesSql,
}