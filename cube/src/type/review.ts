export interface IStatusBarState{
  text:  string;  // 标题文本
  textFontSize: number;  // 文本字体大小
  textColor: string;  // 文本字体颜色
  iconColor: string;  // 图标颜色
}

export interface IDealState{
  avatarSize: number;  // 歌曲封面大小
  avatarUrl: string;  // 歌曲封面图像来源
  name: string;  // 歌曲名
  nameFontSize: number;  // 歌曲名字体大小
  nameColor: string;  // 歌曲名字体颜色
  singer: string;  // 歌手名
  singerFontSize: number;  // 歌手名字体大小
  singerColor: string;  // 歌手名字体颜色
  iconColor: string;  // 图标颜色
}

export interface IReviewStatusBarState{
  title: string;  // 评论区状态标题
  recommendText: string;  // 推荐文本
  hotText: string;  // 最热文本
  newText: string;  // 最新文本
  fontSize: number;  // 字体大小
  focusColor: string; // 选中的字体颜色
  blurColor: string;  // 未选中的字体颜色
}

export interface ICommentState{
  avatarSize: number;  // 头像大小
  usernameFontSize: number;  // 用户名字体大小
  usernameColor: string;  // 用户名字体颜色
  dateFontSize: number;  // 日期字体大小
  dateColor: string;  // 日期字体颜色
  likesIconColor: string;  // 点赞图标颜色
  msgFontSize: number;  // 留言字体大小
  msgColor: string;  // 留言字体颜色
  replyFontSize: number; // 回复数量文本字体大小
  replyColor: string;  // 回复数量文本字体颜色
}

export interface ICommentProp{
  avatarUrl: string;  // 头像资源链
  username: string;  // 用户名
  date: string;  // 发表日期
  likes: number;  // 点赞数
  msg: string;  // 留言内容
  reply: string;  // 回复数量文本
}

export interface IReviewListState{
  reviews: ICommentProp[];
}

export interface ICommentBoxState{
  text: string;  // 确认文本
  fontSize: number;  // 文本字体大小
  color: string;  // 文本字体颜色
  iconColor: string;  // 图标颜色
}