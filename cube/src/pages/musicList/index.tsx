import React, { useState, useEffect } from 'react';
import { getSetting, updateSetting } from 'src/store';
import { WithComponent } from 'src/common/withComponent';
import { MUSIC_LIST, MUSIC_LIST_LAYOUT_CHANGE } from 'src/constants';
import { em, updateComponentPos } from 'src/common';
import { IComponent } from 'src/type/setting';
import styles from './style.module.css';

export default function MusicList() {

  const [state, setState] = useState([]);
  let prePosList: number[] = [];

  useEffect(() => {
    getSetting('musicList')
      .then((res) => {
        if(!res?.length) return;
        setState(res as any);
      })
    // 监听组件布局变化
    em.on(MUSIC_LIST_LAYOUT_CHANGE, (data) => {
      const { preIndex, newIndex } = data;
      let posList = prePosList.slice();
      posList = updateComponentPos(posList, preIndex, newIndex);
      updateSetting('musicList', posList, prePosList)
        .then(() => {
          getSetting('musicList')
            .then((res) => {
              if(!res?.length) return;
              setState(res as any);
              prePosList = res.map((r: any) => r.pos);
        });
      });
    });   
  },[]);

  return (
    <div className={styles.container}>
      <header className={styles.header}></header>
      { 
        state.map((item: IComponent, key) => 
          WithComponent(MUSIC_LIST[item.componentKey], {}, JSON.stringify(item) + key, key))
      }
      <footer className={styles.footer}></footer>
    </div>
  );
}

