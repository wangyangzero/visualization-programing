import React, { useState, useEffect } from 'react';
import { getSetting, updateSetting } from 'src/store';
import { WithComponent } from 'src/common/withComponent';
import { MUSIC_INFO,MUSIC_INFO_LAYOUT_CHANGE } from 'src/constants';
import { IComponent } from 'src/type/setting';
import { em, updateComponentPos } from 'src/common';
import styles from './style.module.css';

export default function MusicInfo() {

  const [state, setState] = useState([]);
  let prePosList: number[] = [];

  useEffect(() => {
    getSetting('musicInfo')
      .then((res) => {
        if(!res?.length) return;
        setState(res as any);
      })
    // 监听组件布局变化
    em.on(MUSIC_INFO_LAYOUT_CHANGE, (data) => {
      const { preIndex, newIndex } = data;
      let posList = prePosList.slice();
      posList = updateComponentPos(posList, preIndex, newIndex);
      updateSetting('musicInfo', posList, prePosList)
        .then(() => {
          getSetting('musicInfo')
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
      { 
        state.map((item: IComponent, key) => 
          WithComponent(MUSIC_INFO[item.componentKey], {}, JSON.stringify(item) + key, key))
      }
    </div>
  );
}
