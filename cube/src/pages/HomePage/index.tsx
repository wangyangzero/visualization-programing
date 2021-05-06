/** 主页： 我的音乐 */
import React, {useState, useEffect} from 'react';
import { getSetting, updateSetting } from 'src/store';
import { WithComponent } from 'src/common/withComponent';
import { em, updateComponentPos } from 'src/common';
import { HOMEPAGE, HOMEPAGE_LAYOUT_CHANGE } from 'src/constants';
import { IComponent } from 'src/type/setting';
import styles from './style.module.css';

const songSheet = [
  {
  avatarUrl: '',
  text: '嘤嘤嘤',
  num: '0首',
  },
  {
    avatarUrl: '',
    text: '可可爱爱莫得脑袋',
    num: '0首',
  }
];

export default function Homepage(): unknown {

  const [state, setState] = useState([]);
  let prePosList: number[] = [];

  useEffect(() => {
    getSetting('homepage')
      .then((res) => {
        if(!res?.length) return;
        console.log(res);
        setState(res as any);
        prePosList = res.map((r: any) => r.pos);
      });
    // 监听组件布局变化
    em.on(HOMEPAGE_LAYOUT_CHANGE, (data) => {
      const { preIndex, newIndex } = data;
      let posList = prePosList.slice();
      posList = updateComponentPos(posList, preIndex, newIndex);
      updateSetting('homepage', posList, prePosList)
        .then(() => {
          getSetting('homepage')
          .then((res) => {
            if(!res?.length) return;
            setState(res as any);
            prePosList = res.map((r: any) => r.pos);
          });
        });
    })
  },[]);

  return (
    <div className={styles.container}>
      {
        state.map((item: IComponent, key) => {
          let props = {};
          if (item.componentKey === 'songSheetListCreate') {
            props = {
              key: 'create',
              name: '创建歌单',
              songSheet
            }
          } else if (item.componentKey === 'songSheetListCollect') {
            props = {
              key: 'collect',
              name: '收藏歌单',
              songSheet
            }
          }
          return WithComponent(HOMEPAGE[item.componentKey], props, JSON.stringify(item) + key, key);
        })
      }
      <footer className={styles.footer}></footer>
    </div>
  );
}
