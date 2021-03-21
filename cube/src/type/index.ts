// 音乐播放事件接口格式
export interface IMusicPlay{
  isPlay: boolean;  // 播放的状态
  currentTime: string;  // 当前播放的进度
  duration: string;  // 音乐播放的总时长
}