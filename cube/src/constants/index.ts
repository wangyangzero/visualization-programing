// 音乐详情页面音乐播放/停止事件
export const MUSIC_PLAY = 'music-play';

// 评论更新（插入评论，删除评论时触发）
export const REVIEW_UPDATE = 'review-update';

// 服务器地址
export const BASE_URL = 'http://127.0.0.1:8080';

// 路由替换
export const ROUTE_PATHNAME: any = {
  'homepage': '/',
  'musicInfo': '/music/info=0',
  'musicList': '/music/list',
  'review': '/review=0',
  '/': 'homepage',
  '/music/info=0': 'musicInfo',
  'music/list': 'musicList',
  '/review=0': 'review'
};

/* 页面key值映射到组件 */

// 首页
import UserInfo from 'src/components/homepage/userInfo'
import ChannelList from 'src/components/homepage/channelList';
import MyFavoriteMusic from 'src/components/homepage/myFavoriteMusic';
import Motto from 'src/components/homepage/motto';
import SongSheetList from 'src/components/homepage/songSheetList';
import Player from 'src/components/common/player';
import { IObject } from 'src/type/setting';

export const  HOMEPAGE: IObject = {
  'userInfo': UserInfo,
  'channelList': ChannelList,
  'myFavoriteMusic': MyFavoriteMusic,
  'motto': Motto,
  'songSheetListCreate': SongSheetList,
  'songSheetListCollect': SongSheetList,
  'player': Player
}

// 音乐播放详情页
import StatusBar from 'src/components/musicInfo/statusBar';
import MusicTape from 'src/components/musicInfo/musicTape';
import MusicInfoPlayer from 'src/components/musicInfo/player';

export const MUSIC_INFO: IObject = {
  statusBar: StatusBar,
  musicTape: MusicTape,
  player: MusicInfoPlayer,
}

// 音乐列表页
import MusicListStatusBar from 'src/components/musicList/statusBar';
import PlaylistInfo from 'src/components/musicList/playlistInfo';
import PlaylistStatusBar from 'src/components/musicList/playlistStatusBar';
import Playlist from 'src/components/musicList/playlist';

export const MUSIC_LIST: IObject = {
  statusBar: MusicListStatusBar,
  playlistInfo: PlaylistInfo,
  playlistStatusBar: PlaylistStatusBar,
  playlist: Playlist,
  player: Player
}

// 评论页
import HeadStatusBar from 'src/components/review/statusBar';
import Deal from 'src/components/review/deal';
import ReviewStatusBar from 'src/components/review/reviewStatusBar';
import ReviewList from 'src/components/review/reviewList';
import CommentBox from 'src/components/review/commentBox'

export const REVIEW: IObject = {
  statusBar: HeadStatusBar,
  deal: Deal,
  reviewStatusBar: ReviewStatusBar,
  reviewList: ReviewList,
  commentBox: CommentBox,
}
