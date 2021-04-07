import React, { useState, useEffect } from 'react';
import { getSetting } from 'src/store';
import { withComponent } from 'src/common/withComponent';
import { MUSIC_LIST } from 'src/constants';
import { IComponent } from 'src/type/setting';
import styles from './style.module.css';

export default function MusicList() {

  const [state, setState] = useState([]);

  useEffect(() => {
    getSetting('musicList')
      .then((res) => {
        if(!res?.length) return;
        setState(res as any);
      })
  },[]);

  return (
    <div className={styles.container}>
      <header className={styles.header}></header>
      { 
        state.map((item: IComponent, key) => 
          withComponent(MUSIC_LIST[item.componentKey], {}, JSON.stringify(item) + key))
      }
      <footer className={styles.footer}></footer>
    </div>
  );
}

