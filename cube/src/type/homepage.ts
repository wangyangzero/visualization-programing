export interface ITagProp{
  children: string;  // 标签名
  className?: string;  // 标签类名
}

export interface ITagState{
  height: number;  // 标签的高度（宽度根据字体长度自适应的）
  fontSize: number;  // 标签内字体大小
  color: string;  // 标签颜色
  fontColor: string;  // 标签内字体颜色
}

export interface IUserInfoState{
  username: string;  // 用户名
  usernameFontSize: number; // 用户名字体大小
  usernameColor: string;  // 用户名字体颜色
  avatarUrl: string; // 头像来源
  avatarSize: number;  // 头像大小
  arrowColor: string;  // 箭头颜色
  tags: string[];  // 标签名的集合
}

export interface IChannelListState{
  imgSources: string[] | undefined[];  // 频道图标资源集合
  texts: string[];  // 频道介绍文本集合
}

export interface IChannelProp{
  imgSource: string | undefined;  // 频道图标资源
  text: string;  // 频道介绍文本
}

export interface IChannelState{
  imgSize: number;  // 图片尺寸
  textFontSize: number;  // 文本字体大小
  textColor: string;  // 文本字体颜色
}

export interface IMyFavoriteMusicState{
  avatarSize: number;  // 背景图标大小
  avatarUrl: string;  // 背景图URL
  heartSize: number;  // 背景图爱心大小
  heartColor: string;  // 背景图爱心颜色
  text: string;  // 标题文案
  textFontSize: number;  // 标题文案大小
  textColor: string;  // 标题文案颜色
  num: string;  // 歌曲数文案
  numFontSize: number;  // 歌曲数文案大小
  numColor: string;  // 歌曲数文案颜色
  tagColor: string;  // 心动模式标签颜色
  tagHeartColor: string;  // 心动模式爱心图标颜色
  tagText: string;  // 心动模式文案
  tagTextFontSize: number;  // 心动模式文案大小
  tagTextColor: string;  // 心动模式文案颜色
}

export interface ISongSheetProp{
  avatarUrl: string;  // 歌单封面图标URL
  text: string;  // 标题文案
  num: string;  // 歌曲数文案
}

export interface ISongSheetState{
  avatarSize: number;  // 歌单封面图标大小
  textFontSize: number;  // 标题文案大小
  textColor: string;  // 标题文案颜色
  numFontSize: number;  // 歌曲数文案大小
  numColor: string;  // 歌曲数文案颜色
  iconColor: string;  // 歌单右侧图标颜色
}
export interface ISongSheetListProp{
  key: string;  // 用于表示歌单类型
  name: string;  // 歌单名称  创建歌单 | 收藏歌单
  songSheet: ISongSheetProp[];  // 歌单数据集
}

export interface ISongSheetListState{
  textFontSize: number;  // 文案字体大小
  textColor: string;  // 文案颜色
  iconColor: string;  // 图标颜色
}

export interface IPlayerState{
  avatarSize: number;  // 胶片图标大小
  inlineIconSize: number;  // 胶片内部图片大小
  title: string;  // 标题文案
  titleFontSize: number;  // 标题文案大小
  titleColor: string;  // 标题文案颜色
  author: string;  // 歌曲数文案
  authorFontSize: number;  // 歌曲数文案大小
  authorColor: string;  // 歌曲数文案颜色
  iconColor: string;  // 播放 & 列表图标颜色
}
