import Homepage from '../pages/homepage';
import MusicInfo from '../pages/musicInfo';
import MusicList from '../pages/musicList';
import Review from '../pages/review';

const routes = [
  {
    path: '/',
    component: Homepage
  },
  {
    path: '/music/info=:index',
    component: MusicInfo
  },
  {
    path: '/music/list',
    component: MusicList
  },
  {
    path: '/review=:index',
    component: Review
  },
];

export default routes;