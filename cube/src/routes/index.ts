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
    path: '/music/info',
    component: MusicInfo,
    routes: [
      {
        path: '/music/list',
        component: MusicList
      },
      {
        path: '/review',
        component: Review
      }
    ]
  }
];

export default routes;