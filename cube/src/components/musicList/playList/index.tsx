import React, { memo, useState } from 'react';
import { IPlaylistState } from 'src/type/musicList';
import SongInfo from './songInfo';
import styles from './style.module.css';

const Playlist = () => {
  const initState:IPlaylistState = {
    songInfo: [
      {
        index: 1,
        name: 'Sky High',
        singer: 'Thomas Prime',
      },
      {
        index: 2,
        name: 'Nothing To Fear',
        singer: 'Dexter Briton',
      },
      {
        index: 3,
        name: 'Promise',
        singer: '山冈晃',
      },
      {
        index: 4,
        name: '未闻花名（口琴版）',
        singer: 'V.A',
      },
      {
        index: 5,
        name: '江上清风游',
        singer: '变奏的梦想',
      },
      {
        index: 6,
        name: '像鱼',
        singer: '王贰浪',
      },
      {
        index: 7,
        name: '黑色狂奏曲',
        singer: '闵东伟',
      },
      {
        index: 1,
        name: 'Sky High',
        singer: 'Thomas Prime',
      },
      {
        index: 2,
        name: 'Nothing To Fear',
        singer: 'Dexter Briton',
      },
      {
        index: 3,
        name: 'Promise',
        singer: '山冈晃',
      },
      {
        index: 4,
        name: '未闻花名（口琴版）',
        singer: 'V.A',
      },
      {
        index: 5,
        name: '江上清风游',
        singer: '变奏的梦想',
      },
      {
        index: 6,
        name: '像鱼',
        singer: '王贰浪',
      },
      {
        index: 7,
        name: '黑色狂奏曲',
        singer: '闵东伟',
      },
    ]
  }
  const [state, setState] = useState(initState);
  const { songInfo } = state;
  return (
    <div className={styles.container}>
      {songInfo.map((item, index) => (
        <SongInfo 
          key={JSON.stringify(item) + index} 
          index={item.index} 
          name={item.name} 
          singer={item.singer}
        />
      ))}
    </div>
  )
}

export default memo(Playlist)
