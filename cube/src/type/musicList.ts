export interface IStatusBarState{
  text: string;  // 文案
  textFontSize: number;  // 文案字体大小
  textColor: string;  // 文案颜色
  iconColor: string;  // 其余图标的颜色
}

export interface IPlayListInfoState{
  avatarSize: number;  // 背景图标大小
  avatarUrl: string;  // 背景图URL
  heartSize: number;  // 背景图爱心大小
  heartColor: string;  // 背景图爱心颜色
  text: string;  // 标题文案
  textFontSize: number;  // 标题文案大小
  textColor: string;  // 标题文案颜色
  userIconUrl: string;  // 用户头像
  userIconSize: number;  // 用户头像大小
  username: string;  // 歌曲数文案
  usernameFontSize: number;  // 歌曲数文案大小
  usernameColor: string;  // 歌曲数文案颜色
  iconColor: string;  // 用户名后面图标的颜色
}

export interface IPlaylistStatusBarState{
  iconBackgroundColor: string;  // 播放图标的背景色
  iconColor: string;  // 其他图标的描边颜色
  text: string;  // 标题文案
  textFontSize: number;  // 标题文案字体大小
  textColor:string;  // 标题文案字体颜色
  num: string;  // 歌单歌曲数目
  numFontSize: number;  // 歌曲数目字体大小
  numColor: string;  // 歌曲数目字体颜色
}

export interface ISongInfoProp{
  index: number;  // 序号
  name: string;  // 歌曲名
  singer: string;  // 歌手
}

export interface ISongInfoState{
  nameFontSize: number;  // 歌曲名字体大小
  nameColor: string;  // 歌曲名字体颜色
  singerFontSize: number;  // 歌手名字体大小
  singerColor: string;  // 歌手名字体颜色 
  iconColor: string;  // 图标颜色
}

export interface IPlaylistState{
  songInfo: ISongInfoProp[];
}
