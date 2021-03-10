export interface IStatusBarState{
  name: string;  // 歌曲名
  nameFontSize: number;  // 歌曲名字体的大小
  nameColor: string;  // 歌曲名字体颜色
  singer: string;  // 歌手名
  singerFontSize: number;  // 歌手名字体大小
  singerColor: string;  // 歌手名字体颜色
  iconColor: string;  // 图标颜色
}

export interface IMusicTapeState{
  avatarSize: number;  // 胶片图标大小
  inlineIconSize: number;  // 胶片内部图片大小
}

export interface IPlayerState{
  iconColor: string;  // 图标颜色
  timerFontSize: number;  // 计时器字体大小
  timerColor: string;  // 计时器字体颜色
  progressColor: string;  // 进度条颜色
}
