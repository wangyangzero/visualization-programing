import React, { useState, useEffect } from 'react';
import { getSetting } from 'src/store';
import { withComponent } from 'src/common/withComponent';
import { MUSIC_INFO } from 'src/constants';
import { IComponent } from 'src/type/setting';
import styles from './style.module.css';

export default function MusicInfo() {

  const [state, setState] = useState([]);

  useEffect(() => {
    getSetting('musicInfo')
      .then((res) => {
        if(!res?.length) return;
        setState(res as any);
      })
  },[]);

  return (
    <div className={styles.container}>
      { 
        state.map((item: IComponent, key) => 
          withComponent(MUSIC_INFO[item.componentKey], {}, JSON.stringify(item) + key))
      }
    </div>
  );
}
