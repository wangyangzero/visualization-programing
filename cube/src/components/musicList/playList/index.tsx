import React, { memo, useState } from 'react';
import { IPlaylistState } from 'src/type/musicList';
import SongInfo from './songInfo';
import { Songs } from 'src/common';
import styles from './style.module.css';

const Playlist = () => {
  const initState:IPlaylistState = {
    songInfo: Songs
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
          source={item.source}
          image={item.image}
        />
      ))}
    </div>
  )
}

export default memo(Playlist)
